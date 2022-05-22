import * as React from 'react';
import Table from 'app/components/Table/Table';
import { GetMyEvaluationsQuery, useDeleteEvaluationMutation } from 'app/generated/graphql';
import useToastStatus from 'app/components/Toast/useToastHook';
import { useSortServerSide } from 'common/useSortServerSide';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import useColumns from 'app/components/ui/User/hooks/useColumns';
import Button from 'app/components/ui/Button/Button';
import ActionButton from 'app/components/ui/Button/ActionButton';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from 'app/routes/routesPath';
import { EvaluationsStatus, EvaluationsStatusText } from 'common/contributors';
import StaticModal from 'app/components/Modal/StaticModal';
import { useDisclosure } from '@chakra-ui/react';
import { ApolloQueryResult } from '@apollo/client';
import { tableActions } from 'app/components/Table/store/actions';

const listColumns = [
  { id: ListUsersColumnID.title, clickAble: false },
  { id: ListUsersColumnID.strategy },
  { id: ListUsersColumnID.department },
  { id: ListUsersColumnID.location },
];

export interface MyEvaluationsTableProps {
  data?: GetMyEvaluationsQuery;
  loading?: boolean;
  refetch: (
    variables?:
      | {
          pageSize?: number;
          page: number;
        }
      | undefined,
  ) => Promise<ApolloQueryResult<GetMyEvaluationsQuery>>;
}

const MyEvaluationsTable: React.FC<MyEvaluationsTableProps> = ({ data, loading, refetch }) => {
  const navigate = useNavigate();
  const toast = useToastStatus();
  const [selectedEvalId, setSelectedEvalId] = React.useState<number | null>(null);

  const [deleteEvaluation, { loading: deleteLoading }] = useDeleteEvaluationMutation({
    onCompleted: () => {
      refetch();
      onCloseConfirmDelete();
      onOpenSuccessDelete();
    },
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });

  const { isOpen: isOpenConfirmDelete, onOpen: onOpenConfirmDelete, onClose: onCloseConfirmDelete } = useDisclosure();
  const { isOpen: isOpenSuccessDelete, onOpen: onOpenSuccessDelete, onClose: onCloseSuccessDelete } = useDisclosure();
  const {
    isOpen: isOpenDeleteUnsuccessful,
    onOpen: onOpenDeleteUnsuccessful,
    onClose: onCloseUnsuccessful,
  } = useDisclosure();

  let totalData = data?.getMyEvaluations.total ?? 0;
  let pageIndex = data?.getMyEvaluations.page ? data?.getMyEvaluations.page - 1 : undefined;

  const myEvaluations = React.useMemo(() => {
    if (!data) return [];

    return data.getMyEvaluations.data.map(e => ({
      rowId: e.id,
      status: e.status,
      optOut: e.optOut,
      ...e.evaluatee,
    }));
  }, [data]);

  const { sort, onSort } = useSortServerSide(refetch);

  const newColumns = [
    {
      id: 'status',
      disableSortBy: true,
      Header: <span className="ml-10">STATUS</span>,
      accessor: original => {
        const status = original.status;

        let link = false;

        if (
          (status !== EvaluationsStatus.NOT_STARTED && status !== EvaluationsStatus.IN_PROGRESS) ||
          original.optOut === true
        ) {
          link = true;
        }

        const handleStatusClick = () => {
          if (status === EvaluationsStatus.COMPLETED) {
            navigate(RoutesPath.EVALUATIONS_VIEW.replace(':evaluationId', `${original.rowId}`), {
              state: { isEvaluationMode: true },
            });
            return;
          }
          navigate(RoutesPath.EVALUATIONS_EDIT.replace(':evaluationId', `${original.rowId}`), {
            state: { isEvaluationMode: true },
          });
        };
        return (
          <Button
            onClick={handleStatusClick}
            variant={link ? 'link' : 'solid'}
            fontSize="13px"
            w="104px"
            textTransform="capitalize"
            fontWeight={400}
          >
            {original?.optOut ? 'Opted Out' : EvaluationsStatusText[status]}
          </Button>
        );
      },
    },
    {
      id: ListUsersColumnID.action,
      Header: 'ACTION',
      disableSortBy: true,
      accessor: original => {
        const status = original.status;

        return (
          <ActionButton
            disabled={status === EvaluationsStatus.COMPLETED}
            menu={[
              {
                label: 'Delete',
                callback: () => {
                  setSelectedEvalId(original.rowId);
                  onOpenConfirmDelete();
                  original.dispatch(tableActions.unSelectRow({ original: original.row.original }));
                },
              },
            ]}
          />
        );
      },
    },
  ];

  const columns = useColumns({ sort, listColumns, newColumns: newColumns });

  const handlePageChange = (pageSize: number, page: number) => {
    refetch({
      page,
    });
  };

  const onDelete = () => {
    if (selectedEvalId === null) return;
    const evaluation = data?.getMyEvaluations.data?.find(evaluation => (evaluation?.id as number) === selectedEvalId);

    if (!evaluation?.isOpenEvaluation) {
      onCloseConfirmDelete();
      onOpenDeleteUnsuccessful();
      return;
    }

    deleteEvaluation({
      variables: {
        evaluationId: selectedEvalId,
      },
    });
  };

  return (
    <>
      <Table
        onSort={onSort}
        onPageChange={handlePageChange}
        hideButtonEdit
        columns={columns}
        data={myEvaluations}
        pageSize={25}
        totalData={totalData}
        loading={loading}
        showPagination={totalData !== 0}
        hiddenColumns={['selection']}
        controlledPageIndex={pageIndex}
      />
      <StaticModal
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        variant="confirmDelete"
        onSubmit={onDelete}
        isSubmitLoading={deleteLoading}
      />
      <StaticModal
        isOpen={isOpenSuccessDelete}
        onClose={onCloseSuccessDelete}
        config={{
          body: 'Open Evaluation Deleted Successfully',
          closeButtonText: 'Close',
        }}
      />
      <StaticModal
        isOpen={isOpenDeleteUnsuccessful}
        onClose={onCloseUnsuccessful}
        config={{
          title: 'Delete Unsuccessful',
          body: 'Only incomplete Open Evaluations can be deleted',
          closeButtonText: 'Close',
        }}
      />
    </>
  );
};

export default MyEvaluationsTable;
