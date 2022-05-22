import { useDisclosure } from '@chakra-ui/react';
import StaticModal from 'app/components/Modal/StaticModal';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import { useDeleteStrategyMutation, useGetAllStrategiesQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import useSelectRows from 'common/useSelectRows';
import { GET_ALL_STRATEGIES } from 'graphql/strategy';
import { useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddStrategyModal from './components/AddStrategyModal';
import { ListStrategiesColumnID } from './types/ListLocationsColumnID.enum';

export const Strategy = () => {
  const navigate = useNavigate();
  const toast = useToastStatus();
  const { data, loading } = useGetAllStrategiesQuery({
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
  const [deleteMultiStrategyMutation, { loading: loadingDelete }] = useDeleteStrategyMutation({
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
  const strategies = data?.getAllStrategies ?? [];
  const columns = useMemo(
    () => [
      {
        id: ListStrategiesColumnID.name,
        Header: 'Strategy Name',
        accessor: 'name',
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

    deleteMultiStrategyMutation({
      variables: { ids: idArray },
      refetchQueries: [
        {
          query: GET_ALL_STRATEGIES,
        },
      ],
    });
  };

  return (
    <>
      <Table
        onDeleteMulti={handleDeleteRows}
        onSelectedRowsChange={onSelectedRowsChange}
        editButtonCallback={handleEditRow}
        onPageChange={handlePageChange}
        columns={columns}
        data={strategies}
        totalData={strategies.length}
        pageSize={20}
        loading={loading && !data}
        loadingDelete={loadingDelete}
        showPagination={strategies.length !== 0}
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
          path={`${RoutesPath.VARIABLES_EDIT}/:strategyId`}
          element={<AddStrategyModal onClose={handleCloseModal} />}
        />
      </Routes>
    </>
  );
};
