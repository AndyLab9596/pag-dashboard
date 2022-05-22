import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import StaticModal from 'app/components/Modal/StaticModal';
import Table from 'app/components/Table/Table';
import TitlePage from 'app/components/TitlePage/TitlePage';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import { useDeleteCyclesMutation, useGetAllCyclesQuery } from 'app/generated/graphql';
import useSelectRows from 'common/useSelectRows';
import config from 'config';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CycleModal from './components/CycleModal';
import { CYCLES_PAGE_SIZE } from './types';

enum ListCyclesColumnID {
  name = 'name',
  createdAt = 'createdAt',
  status = 'status',
}

export function CyclesPage() {
  const toast = useToastStatus();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();

  const navigate = useNavigate();

  const { data, loading, refetch } = useGetAllCyclesQuery({
    notifyOnNetworkStatusChange: true,
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const { selectedRows, onSelectedRowsChange } = useSelectRows<any>();

  const allUserCycles = data?.getAllCycle ?? [];

  const [deleteCycles, { loading: loadingDelete }] = useDeleteCyclesMutation({
    onCompleted: () => {
      refetch();
      onClose();
    },
    fetchPolicy: 'no-cache',
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const columns = useMemo(
    () => [
      {
        id: ListCyclesColumnID.name,
        Header: 'CYCLE NAME',
        accessor: original => (
          <div className="flex">
            <div className="flex flex-col">
              <span className="cursor-pointer">{original.name}</span>
            </div>
          </div>
        ),
        minWidth: '16rem',
      },
      {
        id: ListCyclesColumnID.createdAt,
        Header: 'DATE INITIATED',
        accessor: r => (
          <div className="all-users">
            <div className="all-user-last-login">
              <span>{r.createdAt && dayjs(r.createdAt).format(config.DATE_FORMAT)}</span>
            </div>
          </div>
        ),
      },
      {
        id: ListCyclesColumnID.status,
        Header: 'STATUS',
        accessor: 'status',
        Cell: original => <span>{original.isActive ? 'Opened' : 'Closed'}</span>,
      },
    ],
    [],
  );
  const handleAddClick = () => {
    navigate(`add`);
  };

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleEditRow = row => {
    navigate(`edit/${row.original.id}`);
  };

  const handleDeleteRows = (args: { rows: any; isSelectAll: boolean }) => {
    onOpen();
  };

  const onDeleteConfirm = () => {
    let ids = selectedRows.map(row => row.id);
    deleteCycles({
      variables: {
        input: {
          ids,
        },
      },
    });
  };

  const handlePageChange = useCallback((pageSize: number, page: number) => {}, []);

  return (
    <LayoutRightSide>
      <Box w="100%">
        <Box>
          <TitlePage>CYCLES</TitlePage>
          <Flex justifyContent="end">
            <Button mb={6} onClick={handleAddClick}>
              Add Cycles
            </Button>
          </Flex>
          <Table
            onPageChange={handlePageChange}
            onSelectedRowsChange={onSelectedRowsChange}
            columns={columns}
            data={allUserCycles}
            pageSize={CYCLES_PAGE_SIZE}
            totalData={allUserCycles.length}
            editButtonCallback={handleEditRow}
            onDeleteMulti={handleDeleteRows}
            loadingDelete={loadingDelete}
            loading={loading && !data}
            showPagination={allUserCycles.length !== 0}
            manualPagination={false}
            manualSortBy={false}
          />
        </Box>
        <Routes>
          <Route
            path={`add`}
            element={<CycleModal refetch={refetch} handleClose={handleCloseModal} onOpenSave={onOpenSave}></CycleModal>}
          />
          <Route
            path={`edit/:cycleId`}
            element={<CycleModal refetch={refetch} handleClose={handleCloseModal} onOpenSave={onOpenSave}></CycleModal>}
          />
        </Routes>
      </Box>
      <ModalConfirm
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Are you sure you want to delete?"
        confirmText="Yes"
        onConfirm={onDeleteConfirm}
        isLoading={loadingDelete}
      />
      <StaticModal isOpen={isOpenSave} onClose={onCloseSave} variant="successSave" />
    </LayoutRightSide>
  );
}
