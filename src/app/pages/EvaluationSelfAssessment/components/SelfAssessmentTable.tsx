import { Box, ButtonProps, Divider, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import Loader from 'app/components/Loader/Loader';
import ModalLayout from 'app/components/Modal';
import { tableActions } from 'app/components/Table/store/actions';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import ActionButton from 'app/components/ui/Button/ActionButton';
import Button from 'app/components/ui/Button/Button';
import useColumns from 'app/components/ui/User/hooks/useColumns';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import { useExportSAsLazyQuery, useGetListOfSelfAssessmentQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { EvaluationsStatus, EvaluationsStatusText } from 'common/contributors';
import useSelectRows from 'common/useSelectRows';
import { useSortServerSide } from 'common/useSortServerSide';
import config from 'config';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const listColumns = [
  { id: ListUsersColumnID.title, clickAble: false },
  { id: ListUsersColumnID.strategy },
  { id: ListUsersColumnID.department },
  { id: ListUsersColumnID.location },
];

interface Props {}

const SelfAssessmentTable: React.FC<Props> = () => {
  const toast = useToastStatus();
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { sort, onSort } = useSortServerSide(undefined);

  const { data, loading: queryLoading } = useGetListOfSelfAssessmentQuery({
    variables: {
      page: currentPage,
      sort: {
        field: sort.columnId,
        order: sort.sortDirection,
      },
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
  const [exportSA, { loading: exportLoading }] = useExportSAsLazyQuery({
    onCompleted: data => {
      onOpenResult();

      let url = data.exportSAs.url;
      window.open(`${config.REST_APP_API_URL}/exports?url=${url}`, '_blank');
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
    fetchPolicy: 'no-cache',
  });

  let totalData = data?.getSelfAssessmentList.total;

  const users = useMemo(() => {
    if (!data) return [];

    return data.getSelfAssessmentList.data.map(item => {
      let { id, evaluatee, status } = item;
      return {
        rowId: id,
        status,
        ...evaluatee,
      };
    });
  }, [data]);
  const { selectedRows, onSelectedRowsChange, isSelectAll, setSelectedRows } = useSelectRows<any>();

  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();
  const { isOpen: isOpenResult, onOpen: onOpenResult, onClose: onCloseResult } = useDisclosure();
  const { isOpen: isOpenWarning, onOpen: onOpenWarning, onClose: onCloseWarning } = useDisclosure();

  const newColumns = [
    {
      id: 'status',
      Header: 'STATUS',
      disableSortBy: true,
      accessor: original => {
        let styles: BtnProps = defaultStatusBtn;
        let onClick = () => {};
        if (original.status === EvaluationsStatus.COMPLETED) {
          styles = boldStatusBtn;
          onClick = () =>
            navigate(RoutesPath.EVALUATIONS_VIEW.replace(':evaluationId', `${original.rowId}`), {
              state: { isEvaluationMode: true },
            });
        }

        return (
          <Button type="button" {...styles} onClick={onClick}>
            {original?.status ? EvaluationsStatusText[original?.status] : EvaluationsStatusText['not-started']}
          </Button>
        );
      },
      className: 'common-table',
    },
    {
      id: ListUsersColumnID.action,
      Header: original => (
        <ActionButton
          disabled={!original?.state?.isSelectMulti}
          menu={[
            {
              label: 'Export',
              callback: () => {
                // uncheck not-complete rows
                const originalRows = original.rows;
                const filterInCompleteRows = originalRows.filter(row => row.original.status !== 'complete');
                filterInCompleteRows.forEach(row => {
                  original.dispatch(tableActions.unSelectRow({ original: row.original }));
                });
                //
                onOpenConfirm();
              },
            },
          ]}
        />
      ),
      sortable: false,
      Cell: original => {
        return (
          <ActionButton
            disabled={original?.state?.isSelectMulti}
            menu={[
              {
                label: 'Export',
                callback: () => {
                  if (original?.row?.original.status === 'complete') {
                    setSelectedRows([original?.row?.original]);
                    onOpenConfirm();
                  } else {
                    onOpenWarning();
                  }
                },
              },
            ]}
          />
        );
      },
    },
  ];
  const columns = useColumns({ sort, listColumns, newColumns: newColumns });

  const handlePrint = async () => {
    onCloseConfirm();

    exportSA({
      variables: {
        payload: {
          isEvaluationMode: true,
        },
        filter: {
          userIds: isSelectAll
            ? users.filter(r => r.status !== 'complete').map(r => r.id)
            : selectedRows.map(r => r.id),
          isSelectAll,
        },
      },
    });
  };

  const handlePageChange = (pageSize: number, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table
        onSort={onSort}
        onPageChange={handlePageChange}
        hideButtonEdit
        columns={columns}
        data={users}
        pageSize={25}
        totalData={totalData}
        loading={queryLoading}
        showPagination={totalData !== 0}
        onSelectedRowsChange={onSelectedRowsChange}
      />
      <ModalLayout isOpen={isOpenConfirm} onClose={onCloseConfirm} size="2xl">
        <VStack spacing="4px" py="26px">
          <p className="font-medium">Are you sure you want to export?</p>
          <Divider
            sx={{
              my: '1rem !important',
            }}
            color="#d8e5ee"
          />
          <HStack>
            <Button variant="outline" onClick={onCloseConfirm} w="120px">
              Cancel
            </Button>
            <Button variant="solid" onClick={handlePrint} w="120px">
              Yes
            </Button>
          </HStack>
        </VStack>
      </ModalLayout>
      <ModalLayout isOpen={isOpenResult} onClose={onCloseResult} size="sm">
        <VStack spacing="4px" pt="20px" pb="16px">
          <p className="text-center font-medium">Exported</p>
          <Divider
            sx={{
              my: '12px !important',
            }}
            color="#d8e5ee"
          />
          <Button variant="solid" onClick={onCloseResult} w="120px">
            Close
          </Button>
        </VStack>
      </ModalLayout>
      {/* Modal warning when exporting not-started or in-progress status */}
      <ModalLayout isOpen={isOpenWarning} onClose={onCloseWarning} size="3xl">
        <VStack spacing="4px" pt="20px" pb="16px">
          <p className="text-center font-medium">Only completed Self Assessments can be exported</p>
          <Divider
            sx={{
              my: '12px !important',
            }}
            color="#d8e5ee"
          />
          <Button variant="solid" onClick={onCloseWarning} w="120px">
            Close
          </Button>
        </VStack>
      </ModalLayout>
      {exportLoading && (
        <Box
          sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Loader isLoading={true} />
        </Box>
      )}
    </>
  );
};

type BtnProps = {
  variant: 'link' | 'outline' | 'solid' | 'outlineSecondary' | undefined;
} & Omit<ButtonProps, 'type' | 'onClick'>;

const defaultStatusBtn: BtnProps = {
  variant: 'link',
  fontSize: '13px',
  cursor: 'not-allowed',
};

const boldStatusBtn: BtnProps = {
  ...defaultStatusBtn,
  color: '#000',
  cursor: 'pointer',
};

export default SelfAssessmentTable;
