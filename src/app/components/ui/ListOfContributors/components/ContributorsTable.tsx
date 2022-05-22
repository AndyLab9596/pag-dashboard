import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import { useAuthState } from 'app/components/Auth/useAuthState';
import StaticModal from 'app/components/Modal/StaticModal';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import useColumns from 'app/components/ui/User/hooks/useColumns';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import {
  CreateContributorInput,
  useAddContributorOfUserMutation,
  useApproveLocMutation,
  useDeleteCycleContributorUserMutation,
  useGetContributorsOfUserQuery,
  useSubmitLocMutation,
  useUpdateOneCycleContributorMutation,
} from 'app/generated/graphql';
import { LOCStatus } from 'common/contributors';
import useChecker from 'common/useChecker';
import useSelectRows from 'common/useSelectRows';
import { useSortServerSide } from 'common/useSortServerSide';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import defaultConfig from '../defaultConfig';
import type { ConfigContributorsPage, FormState, PermissionState } from '../types';
import { isAdminRole } from '../utils';
import Action from './Action';
import ActionFormWrapper from './ActionFormWrapper';
import LastYearList from './LastYearList';

const listColumns = [
  { id: ListUsersColumnID.title, header: 'CONTRIBUTOR', clickAble: false },
  { id: ListUsersColumnID.strategy },
  { id: ListUsersColumnID.department },
  { id: ListUsersColumnID.location },
];

interface Props {
  userId: number | null;
  cycleContributorId?: number;
  permissions: PermissionState;
  status: string | null;
  // toggleLastYearList?: () => void;
  config?: ConfigContributorsPage;
  skipUsers?: number[];
  evaluatorId?: number;
  viewLastYearList: boolean;
  toggleLastYearList: () => void;
}

interface StateProps {
  isEvaluator?: boolean;
  search?: string;
  from?: string;
}

const ContributorsTable: React.FC<Props> = ({
  userId,
  cycleContributorId,
  permissions,
  status,
  toggleLastYearList,
  config = defaultConfig,
  children,
  skipUsers,
  evaluatorId,
  viewLastYearList,
}) => {
  config = { ...defaultConfig, ...config };

  const location = useLocation();
  const isEvaluator = (location.state as StateProps)?.isEvaluator ?? true;
  const { identity } = useAuthState();
  let isAdmin = isAdminRole(identity?.roles);
  const toast = useToastStatus();
  const [newStatus, setNewStatus] = useState<string | null>(null);
  const [myLOCId, setMyLOCId] = useState<number[]>([]);

  const {
    data,
    loading: queryLoading,
    refetch,
  } = useGetContributorsOfUserQuery({
    variables: {
      page: 1,
      userId: userId ?? 0,
      isEvaluator,
      pageSize: 200,
    },
    notifyOnNetworkStatusChange: true,
    skip: userId === null,
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });

  const users = useMemo(() => {
    if (!data) {
      return [];
    }
    return data?.getContributorsOfUser.data?.map(u => {
      let { user, id, ...rest } = u;

      return {
        rowId: id,
        disableSelected: config?.handleDisableRow ? config?.handleDisableRow(user) : false,
        ...rest,
        ...user,
      };
    });
  }, [data]);

  const totalData = data?.getContributorsOfUser.total ?? 0;

  useEffect(() => {
    if (skipUsers) setMyLOCId(skipUsers);
  }, [skipUsers]);

  const [updateStatus, { loading: updateLoading }] = useUpdateOneCycleContributorMutation({
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });

  const [addUser, { loading: addLoading }] = useAddContributorOfUserMutation({
    onCompleted: ({ addContributors }) => {
      if (skipUsers) {
        // update skipUsers after adding
        const newContributorsId = addContributors.reduce<number[]>(
          (prev, c) => (!myLOCId.includes(c.user.id) ? [...prev, c.user.id] : prev),
          [],
        );
        setMyLOCId(prev => [...prev, ...newContributorsId]);
      }
      refetch({
        userId: userId ?? 0,
        isEvaluator,
      });
    },
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });

  const [deleteUsers, { loading: deleteLoading }] = useDeleteCycleContributorUserMutation({
    onCompleted: data => {
      // update skipUsers after deleting
      if (skipUsers) {
        let ids = selectedRows.reduce<number[]>((prev, r) => [...prev, r.id], []);
        if (isSelectAll) {
          evaluatorId && !ids.includes(evaluatorId) && ids.push(evaluatorId);
          userId && ids.push(userId);
          setMyLOCId(ids);
        } else {
          setMyLOCId(prev => {
            const newIds = prev.filter(id => !ids.includes(id));
            return newIds;
          });
        }
      }
      refetch({
        userId: userId ?? 0,
        isEvaluator,
      });
    },
    fetchPolicy: 'network-only',
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });
  const [submitLOC, { loading: submitLoading }] = useSubmitLocMutation({
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });
  const [approveLOC, { loading: approveLoading }] = useApproveLocMutation({
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenResult, onOpen: onOpenResult, onClose: onCloseResult } = useDisclosure();
  const { isOpen: isOpenLockSystem, onOpen: onOpenLockSystem, onClose: onCloseLockSystem } = useDisclosure();

  const { sort, onSort } = useSortServerSide(refetch);
  const { checkLockedSystemBeforeSubmitting } = useChecker();
  const { selectedRows, isSelectAll, onSelectedRowsChange } = useSelectRows<any>();

  const newColumns = [
    {
      sortDirection: sort.columnId === 'projectDetails' ? sort.sortDirection : 'none',
      id: 'projectDetails',
      Header: 'PROJECT DETAILS',
      accessor: original => <span>{original.projectDetails || 'N/A'}</span>,
      className: 'common-table',
    },
  ];

  const columns = useColumns({ sort, listColumns, newColumns: newColumns });

  const handlePageChange = (pageSize: number, page: number) => {};

  const onDeleteRows = () => {
    if (selectedRows.length === 0 && !isSelectAll) return;
    let ids = selectedRows.map((r: { rowId: number }) => r.rowId);
    const variables = {
      isSelectAll,
      cycleContributorUserIds: ids,
      userId,
    };

    deleteUsers({
      variables,
    });
  };

  const onAddContributor = (values: FormState | CreateContributorInput[]) => {
    if (userId === null || !cycleContributorId || !values) return;

    // define type of values is FormState or CreateContributorInput[]
    const isFormState = (values: FormState | CreateContributorInput[]): values is FormState => {
      return values !== undefined;
    };
    const isCreateContributorInput = (
      values: FormState | CreateContributorInput[],
    ): values is CreateContributorInput[] => {
      return values !== undefined;
    };

    // add user based on conditions
    if (!viewLastYearList && isFormState(values)) {
      addUser({
        variables: {
          userId: userId,
          data: [
            {
              projectDetails: values.details,
              contributorId: +values.contributor.value,
            },
          ],
        },
      });
    }

    if (viewLastYearList && isCreateContributorInput(values)) {
      addUser({
        variables: {
          userId: userId,
          data: values,
        },
      });
    }

    // when adding a contributor, we need to update the status of the cycle contributor to LOCStatusAfterAddContributor
    if (status !== config.LOCStatusAfterAddContributor) {
      updateStatus({
        variables: {
          id: cycleContributorId,
          data: {
            status: config.LOCStatusAfterAddContributor ?? LOCStatus.IN_PROGRESS,
          },
        },
      });
    }
  };

  // submit available only if the list of contributors at least 5
  const onSubmit = async (isNotifyChecked?: boolean) => {
    if (userId === null || !cycleContributorId) return;
    onClose();
    if (await checkLockedSystemBeforeSubmitting()) {
      // open locked system modal
      onOpenLockSystem();
      return;
    }

    // if current status is submitted -> change to approved
    // if current status is not started || in progress -> change to submitted
    if (status === LOCStatus.SUBMITTED) {
      setNewStatus(LOCStatus.APPROVED);
      approveLOC({
        variables: {
          ids: {
            cycleContributorIds: [cycleContributorId],
          },
          isSendReminder: (isAdmin && config.sendReminder && isNotifyChecked) ?? false,
        },
        onQueryUpdated() {
          onOpenResult();
        },
      });
    } else {
      setNewStatus(LOCStatus.SUBMITTED);
      submitLOC({
        variables: {
          evaluateeId: userId === identity?.id ? undefined : userId,
          isSendReminder: (isAdmin && config.sendReminder && isNotifyChecked) ?? false,
        },
        onQueryUpdated() {
          onOpenResult();
        },
      });
    }
  };

  const onCloseResultAndBack = () => {
    onCloseResult();
    config.closeCallback && config?.closeCallback();
  };

  if (!viewLastYearList) {
    return (
      <>
        {/* data */}
        <Table
          onSort={onSort}
          onPageChange={handlePageChange}
          onSelectedRowsChange={onSelectedRowsChange}
          hideButtonEdit
          columns={columns}
          data={users}
          pageSize={20}
          totalData={totalData}
          loading={queryLoading && !data}
          showPagination={totalData !== 0}
          hiddenColumns={permissions.canDelete ? [] : ['selection']}
          manualPagination={false}
        />

        <Box mb="14px" />
        {config?.isActionVisible && (
          <ActionFormWrapper>
            <Action
              showDelete={(selectedRows && selectedRows.length > 0) || isSelectAll}
              onDelete={onDeleteRows}
              deleteLoading={deleteLoading}
              addLoading={addLoading}
              skipUsers={skipUsers ? myLOCId : users?.map(u => u.id).concat(userId ? [userId] : [])}
              permissions={permissions}
              onSubmit={onAddContributor}
            />
          </ActionFormWrapper>
        )}

        {config?.isSubmitVisible && (
          <>
            <HStack justifyContent="space-between" px="30px" pb="30px">
              <Button
                variant="outline"
                color="#000"
                border="1px solid #d8dce6"
                boxShadow="0 1px 2px 0 rgba(0,0,0,0.08)"
                fontSize="13px"
                fontWeight="500"
                onClick={toggleLastYearList}
              >
                View Last Year's List
              </Button>
              <Button
                disabled={totalData < 5}
                fontSize="13px"
                fontWeight="500"
                px="2rem"
                onClick={onOpen}
                isLoading={updateLoading || submitLoading || approveLoading}
              >
                {status === LOCStatus.SUBMITTED && permissions.canApprove ? 'Approve' : 'Submit'}
              </Button>
            </HStack>
            <StaticModal
              isOpen={isOpen}
              onClose={onClose}
              variant={
                status === LOCStatus.SUBMITTED && permissions.canApprove ? 'confirmApproveLOC' : 'confirmSubmitLOC'
              }
              onSubmit={onSubmit}
              withReminder={isAdmin && config.sendReminder}
            />
            <StaticModal
              isOpen={isOpenResult}
              onClose={onCloseResultAndBack}
              variant={newStatus === LOCStatus.SUBMITTED ? 'successSubmit' : 'successApprove'}
            />
            <StaticModal isOpen={isOpenLockSystem} onClose={onCloseLockSystem} variant="lockSystem" />
          </>
        )}
        {children}
      </>
    );
  }
  return (
    <LastYearList
      toggleLastYearList={toggleLastYearList}
      userId={userId}
      onAddContributorLastYear={onAddContributor}
      addLoading={addLoading}
    />
  );
};

export default ContributorsTable;
