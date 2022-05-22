import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { getOperationName } from '@apollo/client/utilities';

import ActionButton from 'app/components/ui/Button/ActionButton';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import { useActionModal } from '../contexts/ActionModalContext';
import useReport from '../hooks/useReport';
import { ReportTypes } from '../types/Report.enum';
import { ModalProperties, ModalVariantKey } from 'app/components/Modal/types';
import { useUserPermissions } from 'common/useUserPermissions';
import { useAddOneOverallPerformanceSummaryMutation } from 'app/generated/graphql';
import { client } from 'app/GraphqlProvider';
import { GET_LIST_USER_ACTION_FULL, GET_LIST_USER_ACTION_REPORTS } from 'graphql/actions';
import useToastStatus from 'app/components/Toast/useToastHook';

interface ShareOPSResponse {
  shareOps: {
    error: string | null;
    status: boolean;
  };
}

interface StaticModalProps {
  variant?: ModalVariantKey;
  config?: ModalProperties;
}

export default function useAction() {
  const { onOpenModal, handleSetFilter, filter } = useActionModal();
  const { report } = useReport();
  const toast = useToastStatus();

  const [createOPS] = useAddOneOverallPerformanceSummaryMutation({
    onCompleted: _ => refetchListContainOPS(),
    onError: error => {
      toast({
        status: 'error',
        title: error.message,
      });
    },
  });
  const { isAdminEditForm } = useUserPermissions();

  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [staticModalProps, setStaticModalProps] = useState<StaticModalProps>({});

  //#region static modal state
  const { isOpen: isOpenStaticModal, onClose: onCloseStaticModal, onOpen: onOpenStaticModal } = useDisclosure();
  //#endregion

  const handleOpenStaticModal = (args: { variant?: ModalVariantKey; config?: ModalProperties }) => {
    setStaticModalProps(args);
    onOpenStaticModal();
  };

  const refetchListContainOPS = async () => {
    await client.refetchQueries({
      include: [
        getOperationName(GET_LIST_USER_ACTION_FULL) ?? '',
        getOperationName(GET_LIST_USER_ACTION_REPORTS) ?? '',
      ],
      optimistic: true,
    });
  };

  const handleShareOPS = async (isSelectAll: boolean, userIds: number[], cycleId: number | undefined) => {
    try {
      setIsActionLoading(true);
      const response: ShareOPSResponse = await report({
        type: ReportTypes.shareOPS,
        specialFilter: { isSelectAll, userIds, ...(cycleId && { cycleId }) },
      });

      if (response.shareOps.status === true) {
        handleOpenStaticModal({
          config: {
            body: 'Shared OPS successfully',
            closeButtonText: 'Close',
          },
        });
        refetchListContainOPS();
      } else {
        handleOpenStaticModal({
          config: {
            body: 'Oops! Failed to share OPS, please try again',
            closeButtonText: 'Close',
          },
        });
      }
    } catch (error) {
      handleOpenStaticModal({
        config: {
          body: 'Oops! Failed to share OPS, please try again',
          closeButtonText: 'Close',
        },
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleActionCallbackMultiple = original => {
    let rowCycleId = original?.rows[0]?.original?.cycleId ?? undefined;

    const newFilter = {
      isSelectAll: (original?.state?.isSelectAll || original?.state?.isException) ?? false,
      userIds: original?.state?.selectedRowsData.map(r => r?.id) ?? [],
      ...(filter.cycleId !== rowCycleId && rowCycleId !== undefined ? { cycleId: rowCycleId } : {}),
    };
    handleSetFilter(newFilter, false);
  };

  const rowAction = {
    id: ListUsersColumnID.action,
    Header: original => (
      <ActionButton
        width="220px"
        disabled={!original?.state?.isSelectMulti}
        menu={
          isAdminEditForm
            ? [
                {
                  label: 'Reset',
                  callback: () => {
                    onOpenModal('reset');
                    handleActionCallbackMultiple(original);
                  },
                },
                {
                  label: 'Approve',
                  callback: () => {
                    onOpenModal('approve');
                    handleActionCallbackMultiple(original);
                  },
                },
                {
                  label: 'Send Reminder',
                  callback: () => {
                    onOpenModal('sendReminder');
                    handleActionCallbackMultiple(original);
                  },
                },
                {
                  label: 'Export',
                  callback: () => {
                    onOpenModal('export');
                    handleActionCallbackMultiple(original);
                  },
                },
                {
                  label: 'Share Overall Perf.Summary',
                  callback: async () => {
                    let isSelectAll = original?.state?.isSelectAll || original?.state?.isException;
                    let userIds = original?.state?.selectedRowsData?.map(r => r?.id) ?? [];
                    let rowCycleId = original?.rows[0]?.original?.cycleId ?? undefined;
                    handleActionCallbackMultiple(original);

                    await handleShareOPS(isSelectAll, userIds, rowCycleId);
                  },
                },
              ]
            : [
                {
                  label: 'Send Reminder',
                  callback: () => {
                    onOpenModal('sendReminder');
                    handleActionCallbackMultiple(original);
                  },
                },
                {
                  label: 'Export',
                  callback: () => {
                    onOpenModal('export');
                    handleActionCallbackMultiple(original);
                  },
                },
              ]
        }
      />
    ),
    Cell: original => (
      <ActionButton
        width="220px"
        disabled={original?.state?.isSelectMulti}
        menu={
          isAdminEditForm
            ? [
                {
                  label: 'Reset',
                  callback: () => {
                    onOpenModal('reset');
                    handleSetFilter(
                      {
                        isSelectAll: false,
                        userIds: [original?.row?.original?.id],
                      },
                      false,
                    );
                  },
                },
                {
                  label: 'Approve',
                  callback: () => {
                    onOpenModal('approve');
                    handleSetFilter(
                      {
                        isSelectAll: false,
                        userIds: [original?.row?.original?.id],
                      },
                      false,
                    );
                  },
                },
                {
                  label: 'Send Reminder',
                  callback: () => {
                    onOpenModal('sendReminder');
                    handleSetFilter(
                      {
                        isSelectAll: false,
                        userIds: [original?.row?.original?.id],
                      },
                      false,
                    );
                  },
                },
                {
                  label: 'Export',
                  callback: () => {
                    onOpenModal('export');
                    handleSetFilter(
                      {
                        isSelectAll: false,
                        userIds: [original?.row?.original?.id],
                        ...(filter.cycleId !== original?.row?.original?.cycleId
                          ? { cycleId: original?.row?.original?.cycleId }
                          : {}),
                      },
                      false,
                    );
                  },
                },

                Array.isArray(original?.row?.original?.overallPerformanceSummary) &&
                original?.row?.original?.overallPerformanceSummary.length > 0
                  ? {
                      label: 'Share Overall Perf.Summary',
                      callback: async () => {
                        handleSetFilter(
                          {
                            isSelectAll: false,
                            userIds: [original?.row?.original?.id],
                            ...(filter.cycleId !== original?.row?.original?.cycleId
                              ? {
                                  cycleId: original?.row?.original?.cycleId,
                                }
                              : {}),
                          },
                          false,
                        );
                        await handleShareOPS(
                          false,
                          [original?.row?.original?.id],
                          original?.rows[0]?.original?.cycleId ?? undefined,
                        );
                      },
                    }
                  : {
                      label: 'Create Overall Perf.Summary',
                      callback: async () => {
                        createOPS({
                          variables: {
                            data: {
                              // in the old site, it does not send cycleId
                              // cycleId: original?.row?.original?.cycleId,
                              userId: original?.row?.original?.id,
                              status: 'not-started',
                              isShare: false,
                            },
                          },
                        });
                      },
                    },
              ]
            : [
                {
                  label: 'Send Reminder',
                  callback: () => {
                    onOpenModal('sendReminder');
                    handleSetFilter(
                      {
                        isSelectAll: false,
                        userIds: [original?.row?.original?.id],
                      },
                      false,
                    );
                  },
                },
                {
                  label: 'Export',
                  callback: () => {
                    onOpenModal('export');
                    handleSetFilter(
                      {
                        isSelectAll: false,
                        userIds: [original?.row?.original?.id],
                        ...(filter.cycleId !== original?.row?.original?.cycleId
                          ? { cycleId: original?.row?.original?.cycleId }
                          : {}),
                      },
                      false,
                    );
                  },
                },
              ]
        }
      />
    ),
  };

  return { rowAction, isActionLoading, onCloseStaticModal, isOpenStaticModal, staticModalProps };
}
