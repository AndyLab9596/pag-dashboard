import { Switch as SwitchChakra, useDisclosure } from '@chakra-ui/react';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import StaticModal from 'app/components/Modal/StaticModal';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import {
  Department as DepartmentType,
  useDeleteDepartmentMutation,
  useGetAllDepartmentsQuery,
  useUpdateOneDepartmentMutation,
} from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import useSelectRows from 'common/useSelectRows';
import dayjs from 'dayjs';
import { GET_ALL_DEPARTMENTS } from 'graphql/department';
import { useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import config from '../../../../config';
import AddDepartmentModal from './components/AddDepartmentModal';
import { DEPARTMENTS_PAGE_SIZE } from './types';
import { ListDepartmentsColumnID } from './types/ListDepartmentsColumnID.enum';

interface DepartmentProps {
  strategyId?: number;
}
export const Department: React.FC<DepartmentProps> = props => {
  const toast = useToastStatus();
  const { strategyId } = props;
  const navigate = useNavigate();
  const { data, loading } = useGetAllDepartmentsQuery({
    variables: {
      strategyId,
    },
    notifyOnNetworkStatusChange: true,
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const departments = data?.getAllDepartments ?? [];
  const handleEditRow = row => {
    navigate(`${RoutesPath.VARIABLES_EDIT}/${row.original.id}`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenConfirmDelete, onOpen: onOpenConfirmDelete, onClose: onCloseConfirmDelete } = useDisclosure();

  const [selectedRow, setSelectedRow] = useState<DepartmentType | undefined>(undefined);
  const [updateOneDepartmentMutation, { loading: loadingUpdate }] = useUpdateOneDepartmentMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [deleteMultiDepartmentMutation, { loading: loadingDelete }] = useDeleteDepartmentMutation({
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
  const handlePageChange = (pageSize: number, page: number) => {};
  const { selectedRows, onSelectedRowsChange } = useSelectRows<any>();

  const columns = useMemo(
    () => [
      {
        id: ListDepartmentsColumnID.name,
        Header: 'DEPARTMENT NAME',
        accessor: 'name',

        minWidth: '10rem',
      },
      {
        id: ListDepartmentsColumnID.deadlineLOC,
        Header: 'LIST OF CONTRIBUTORS',
        accessor: d => (d.deadlineLOC ? dayjs(d.deadlineLOC).format(config.DATE_FORMAT) : ''),
      },
      {
        id: ListDepartmentsColumnID.deadlineConfirmLOC,
        Header: 'CONFIRM LOC',
        accessor: d => (d.deadlineConfirmLOC ? dayjs(d.deadlineConfirmLOC).format(config.DATE_FORMAT) : ''),
      },
      {
        id: ListDepartmentsColumnID.deadlineSelfAssessment,
        Header: 'SELF ASSESMENTS',
        accessor: d => (d.deadlineSelfAssessment ? dayjs(d.deadlineSelfAssessment).format(config.DATE_FORMAT) : ''),
      },
      {
        id: ListDepartmentsColumnID.deadlinePerformanceEvaluation,
        Header: 'PERFORMANCE EVALUATION',
        accessor: d =>
          d.deadlinePerformanceEvaluation ? dayjs(d.deadlinePerformanceEvaluation).format(config.DATE_FORMAT) : '',
      },
      {
        id: ListDepartmentsColumnID.lockDate,
        Header: 'LOCK DATE',
        accessor: d => (d.lockDate ? dayjs(d.lockDate).format(config.DATE_FORMAT) : ''),
      },
      {
        id: ListDepartmentsColumnID.showPreviousComment,
        Header: 'SHOW PREV.COMMENT',
        accessor: original => (
          <SwitchChakra
            onChange={() => {
              confirmUpdateShowPreComment(original);
            }}
            isChecked={original.showPreviousComment}
            colorScheme="green"
            size="md"
          />
        ),
      },
    ],
    [],
  );

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleDeleteRows = (args: { rows: any; isSelectAll: boolean }) => {
    onOpenConfirmDelete();
  };

  const onSubmitDelete = (): void => {
    const idArray: number[] | number = selectedRows.map(r => Number.parseInt(r.id));

    deleteMultiDepartmentMutation({
      variables: { ids: idArray },
      refetchQueries: [
        {
          query: GET_ALL_DEPARTMENTS,
          variables: {
            strategyId,
          },
        },
      ],
    });
  };

  const confirmUpdateShowPreComment = row => {
    setSelectedRow(row);
    onOpen();
  };

  const handleConfirmUpdateShowPreComment = async () => {
    const res = await updateOneDepartmentMutation({
      variables: {
        id: selectedRow!.id,
        data: {
          name: selectedRow!.name,
          showPreviousComment: !selectedRow!.showPreviousComment,
        },
      },
      refetchQueries: [
        {
          query: GET_ALL_DEPARTMENTS,
          variables: {
            strategyId,
          },
        },
      ],
    });
    if (res) onClose();
  };

  const handleCloseConfirmUpdateShowPreComment = () => {
    setSelectedRow(undefined);
    onClose();
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
        data={departments}
        totalData={departments.length}
        pageSize={DEPARTMENTS_PAGE_SIZE}
        loading={loading && !data}
        showPagination={departments.length !== 0}
        manualPagination={false}
        manualSortBy={false}
      />
      <ModalConfirm
        onConfirm={() => handleConfirmUpdateShowPreComment()}
        isOpen={isOpen}
        onClose={handleCloseConfirmUpdateShowPreComment}
        isCentered={false}
        isLoading={loadingUpdate}
        modalTitle="Are you sure you want to update this row?"
        confirmText="Yes"
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
          path={`${RoutesPath.VARIABLES_EDIT}/:departmentId`}
          element={<AddDepartmentModal onClose={handleCloseModal} />}
        />
      </Routes>
    </>
  );
};
