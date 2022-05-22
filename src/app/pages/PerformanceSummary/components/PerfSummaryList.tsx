import { Box, Divider, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import Loader from 'app/components/Loader/Loader';
import ModalLayout from 'app/components/Modal';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import ActionButton from 'app/components/ui/Button/ActionButton';
import Button from 'app/components/ui/Button/Button';
import PerformanceSummaryStatus from 'app/components/ui/Button/PerformanceSummaryStatus';
import useColumns from 'app/components/ui/User/hooks/useColumns';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import {
  PerformanceSummaryDetails,
  useExportPerformanceSummaryLazyQuery,
  useGetPerformanceSummariesQuery,
} from 'app/generated/graphql';
import useSelectRows from 'common/useSelectRows';
import { useSortServerSide } from 'common/useSortServerSide';
import config from 'config';
import { useMemo } from 'react';

const listColumns = [
  { id: ListUsersColumnID.title, clickAble: false },
  { id: ListUsersColumnID.strategy },
  { id: ListUsersColumnID.department },
  { id: ListUsersColumnID.location },
];

const PerfSummaryList = () => {
  const toast = useToastStatus();

  const { data, loading, refetch } = useGetPerformanceSummariesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [exportPS, { loading: exportLoading }] = useExportPerformanceSummaryLazyQuery({
    onCompleted: data => {
      onOpenResult();

      let url = data.exportPerformanceSummary.url;
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

  let users = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.getReportPerformanceSummary.map(u => {
      let { user, id, ...rest } = u;

      return {
        ...user,
        ...rest,
        rowId: id,
      };
    });
  }, [data]);

  const { selectedRows, onSelectedRowsChange, isSelectAll, setSelectedRows } =
    useSelectRows<PerformanceSummaryDetails>();

  const { sort, onSort } = useSortServerSide(refetch);
  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();
  const { isOpen: isOpenResult, onOpen: onOpenResult, onClose: onCloseResult } = useDisclosure();

  const newColumns = [
    {
      id: 'evaluationStatus',
      Header: <div className="flex items-center justify-center w-full text-center whitespace-pre-line">STATUS</div>,
      accessor: original => {
        let psComplete = original?.isComplete ?? false;
        let evaluateeId = original?.id;
        let evaluatorId = original?.evaluator?.id;

        return (
          <div className="text-center">
            <PerformanceSummaryStatus
              psComplete={psComplete}
              evaluateeId={evaluateeId}
              evaluatorId={evaluatorId}
              percentageComplete={original?.percentComplete}
            />
          </div>
        );
      },
      disableSortBy: true,
    },
    {
      id: ListUsersColumnID.action,
      Header: original => {
        return (
          <ActionButton
            disabled={!original?.state?.isSelectMulti}
            menu={[
              {
                label: 'Export',
                callback: () => {
                  onOpenConfirm();
                },
              },
            ]}
          />
        );
      },
      disableSortBy: true,
      Cell: original => (
        <ActionButton
          disabled={original?.state?.isSelectMulti}
          menu={[
            {
              label: 'Export',
              callback: () => {
                setSelectedRows([original?.row?.original]);
                onOpenConfirm();
              },
            },
          ]}
        />
      ),
    },
  ];

  const columns = useColumns({ sort, listColumns, newColumns });
  const handlePrint = async () => {
    onCloseConfirm();
    exportPS({
      variables: {
        payload: {
          withNames: true,
          withNormalization: true,
          isEvaluator: true,
        },
        filter: {
          userIds: selectedRows.map(r => r.id),
          isSelectAll,
        },
      },
    });
  };

  return (
    <>
      <Table
        onSort={onSort}
        onPageChange={(pageSize: number, page: number) => {}}
        hideButtonEdit
        columns={columns}
        data={users}
        pageSize={25}
        totalData={users.length}
        loading={loading}
        showPagination={users.length !== 0}
        onSelectedRowsChange={onSelectedRowsChange}
        manualPagination={false}
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

export default PerfSummaryList;
