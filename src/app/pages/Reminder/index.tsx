import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import StaticModal from 'app/components/Modal/StaticModal';
import Table from 'app/components/Table/Table';
import TitlePage from 'app/components/TitlePage/TitlePage';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import { useDeleteReminderTemplateMutation, useGetAllReminderTemplatesQuery } from 'app/generated/graphql';
import React, { useCallback, useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ReminderModal from './components/ReminderModal';
export function RemindersPage() {
  const toast = useToastStatus();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();

  const [idArray, setIdArray] = React.useState<number[]>([]);
  const navigate = useNavigate();
  const { data, loading, refetch } = useGetAllReminderTemplatesQuery({
    notifyOnNetworkStatusChange: true,
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const allReminderTemplate = data?.getAllReminderTemplates ?? [];

  const [deleteReminderTemplateMutation, { loading: loadingDelete }] = useDeleteReminderTemplateMutation({
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
        id: 'name',
        Header: 'REMINDERS',
        accessor: 'name',
      },
    ],
    [],
  );

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleAddClick = (): void => {
    navigate('add');
  };

  const handleDeleteRows = (args: { rows: any; isSelectAll: boolean }) => {
    setIdArray(args.rows?.map(r => Number.parseInt(r.id)));
    onOpen();
  };

  const onDeleteConfirm = () => {
    deleteReminderTemplateMutation({
      variables: { ids: idArray },
    }).then(() => {
      refetch();
      onClose();
    });
  };

  const handleEditRow = useCallback(row => {
    navigate(`edit/${row.original.id}`);
  }, []);

  const handlePageChange = (pageSize: number, page: number) => {};

  return (
    <LayoutRightSide>
      <Box w="100%">
        <Box>
          <TitlePage>Reminders</TitlePage>
          <Flex mb={6} justifyContent="end">
            <Button type="submit" onClick={handleAddClick}>
              Add Reminders
            </Button>
          </Flex>
          <Table
            onPageChange={handlePageChange}
            columns={columns}
            data={allReminderTemplate}
            pageSize={20}
            onDeleteMulti={handleDeleteRows}
            editButtonCallback={handleEditRow}
            loading={loading}
            loadingDelete={loadingDelete}
            totalData={allReminderTemplate.length}
            showPagination={allReminderTemplate.length !== 0}
            manualPagination={false}
            manualSortBy={false}
          />
        </Box>
        <Routes>
          <Route path="add" element={<ReminderModal handleClose={handleCloseModal} />} />
          <Route
            path="edit/:reminderId"
            element={<ReminderModal handleClose={handleCloseModal} handleOpenSave={onOpenSave} />}
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
