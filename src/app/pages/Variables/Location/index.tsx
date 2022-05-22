import { useDisclosure } from '@chakra-ui/react';
import StaticModal from 'app/components/Modal/StaticModal';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import { useDeleteLocationMutation, useGetAllLocationsQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import useSelectRows from 'common/useSelectRows';
import { GET_ALL_LOCATIONS } from 'graphql/location';
import { useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddLocationModal from './components/AddLocationModal';
import { ListLocationsColumnID } from './types/ListLocationsColumnID.enum';

export const Location = () => {
  const toast = useToastStatus();
  const navigate = useNavigate();
  const { data, loading } = useGetAllLocationsQuery({
    notifyOnNetworkStatusChange: true,
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const { isOpen: isOpenConfirmDelete, onOpen: onOpenConfirmDelete, onClose: onCloseConfirmDelete } = useDisclosure();
  const [deleteMultiLocationMutation, { loading: loadingDelete }] = useDeleteLocationMutation({
    onCompleted: () => {
      onCloseConfirmDelete();
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const { selectedRows, onSelectedRowsChange } = useSelectRows<any>();
  const locations = data?.getAllLocations ?? [];
  const columns = useMemo(
    () => [
      {
        id: ListLocationsColumnID.name,
        Header: 'CITY',
        accessor: 'name',
        minWidth: '20rem',
      },
      {
        id: ListLocationsColumnID.countryCode,
        Header: 'COUNTRY',
        accessor: 'countryCode',
        minWidth: '20rem',
      },
    ],
    [],
  );

  const handleEditRow = row => {
    navigate(`${RoutesPath.VARIABLES_EDIT}/${row.original.id}`);
  };

  const handlePageChange = (pageSize: number, page: number) => {};

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleDeleteRows = (args: { rows: any; isSelectAll: boolean }): void => {
    onOpenConfirmDelete();
  };

  const onSubmitDelete = () => {
    const idArray: number[] | number = selectedRows.map(r => Number.parseInt(r.id));

    deleteMultiLocationMutation({
      variables: { ids: idArray },
      refetchQueries: [
        {
          query: GET_ALL_LOCATIONS,
        },
      ],
    });
  };

  return (
    <>
      <Table
        onDeleteMulti={handleDeleteRows}
        loadingDelete={loadingDelete}
        onSelectedRowsChange={onSelectedRowsChange}
        editButtonCallback={handleEditRow}
        onPageChange={handlePageChange}
        columns={columns}
        data={locations}
        totalData={locations.length}
        pageSize={20}
        loading={loading && !data}
        showPagination={locations.length !== 0}
        manualPagination={false}
        manualSortBy={false}
      />
      <StaticModal
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        variant="confirmDelete"
        onSubmit={onSubmitDelete}
        isSubmitLoading={loadingDelete}
      />
      <Routes>
        <Route
          path={`${RoutesPath.VARIABLES_EDIT}/:locationId`}
          element={<AddLocationModal onClose={handleCloseModal} />}
        />
      </Routes>
    </>
  );
};
