import { HStack, useDisclosure } from '@chakra-ui/react';
import StaticModal from 'app/components/Modal/StaticModal';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import { useApproveLocMutation } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { defaultNavigate } from 'common';
import useChecker from 'common/useChecker';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: number;
  disabled?: boolean;
  cycleContributorId?: number;
}

const Action: React.FC<Props> = ({ userId, disabled, cycleContributorId }) => {
  const toast = useToastStatus();
  const [approveLOC, { loading: approveLoading }] = useApproveLocMutation({
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });
  let navigate = useNavigate();
  const { checkLockedSystemBeforeSubmitting } = useChecker();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isOpenLockSystem, onOpen: onOpenLockSystem, onClose: onCloseLockSystem } = useDisclosure();

  const onApprove = async () => {
    if (cycleContributorId === undefined) return;
    onClose();

    if (await checkLockedSystemBeforeSubmitting()) {
      // open locked system modal
      onOpenLockSystem();
      return;
    }

    approveLOC({
      variables: {
        ids: {
          cycleContributorIds: [cycleContributorId],
        },
        isSendReminder: false,
      },
      onQueryUpdated() {
        defaultNavigate(navigate);
      },
    });
  };

  return (
    <>
      <HStack justifyContent="flex-end" px="30px" pb="30px">
        <Button
          variant="outline"
          color="#000"
          border="1px solid #d8dce6"
          boxShadow="0 1px 2px 0 rgba(0,0,0,0.08)"
          fontSize="13px"
          fontWeight="500"
          onClick={() => navigate(RoutesPath.LIST_OF_CONTRIBUTORS_OF_USER_EDIT.replace(':userId', userId.toString()))}
        >
          Edit
        </Button>
        <Button
          disabled={disabled}
          fontSize="13px"
          fontWeight="500"
          px="2rem"
          onClick={onOpen}
          isLoading={approveLoading}
        >
          Approve
        </Button>
      </HStack>
      <StaticModal variant="confirmApproveLOC" isOpen={isOpen} onClose={onClose} onSubmit={onApprove} />
      <StaticModal isOpen={isOpenLockSystem} onClose={onCloseLockSystem} variant="lockSystem" />
    </>
  );
};

export default Action;
