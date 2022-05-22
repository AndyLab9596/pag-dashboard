import { useDisclosure } from '@chakra-ui/react';
import StaticModal from 'app/components/Modal/StaticModal';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import { useDeleteTitleMutation, useGetAllTitlesQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import useSelectRows from 'common/useSelectRows';
import { GET_ALL_TITLES } from 'graphql/title';
import { useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddTitleModal from './components/AddTitleModal';
import { ListTitlesColumnID } from './types/ListTitlesColumnID.enum';

export const Title = () => {
  const toast = useToastStatus();
  const navigate = useNavigate();
  const { data, loading } = useGetAllTitlesQuery({
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
  const [deleteMultiTitleMutation, { loading: loadingDelete }] = useDeleteTitleMutation({
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
  const titles = data?.getAllTitles ?? [];
  const columns = useMemo(
    () => [
      {
        id: ListTitlesColumnID.name,
        Header: 'TITLE',
        accessor: 'name',
        minWidth: '20rem',
      },
      {
        id: ListTitlesColumnID.isMDOrAbove,
        Header: 'MD + LIST',
        accessor: d => (d.isMDOrAbove ? 'Yes' : null),
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

    deleteMultiTitleMutation({
      variables: { ids: idArray },
      refetchQueries: [
        {
          query: GET_ALL_TITLES,
        },
      ],
    });
  };

  return (
    <>
      <Table
        onDeleteMulti={handleDeleteRows}
        editButtonCallback={handleEditRow}
        onSelectedRowsChange={onSelectedRowsChange}
        onPageChange={handlePageChange}
        columns={columns}
        data={titles}
        totalData={titles.length}
        pageSize={20}
        loading={loading && !data}
        loadingDelete={loadingDelete}
        showPagination={titles.length !== 0}
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
        <Route path={`${RoutesPath.VARIABLES_EDIT}/:titleId`} element={<AddTitleModal onClose={handleCloseModal} />} />
      </Routes>
    </>
  );
};
