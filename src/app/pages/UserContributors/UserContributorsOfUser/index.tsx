import { useAuthState } from 'app/components/Auth/useAuthState';
import useToastStatus from 'app/components/Toast/useToastHook';
import ListOfContributors from 'app/components/ui/ListOfContributors';
import ContributorsTable from 'app/components/ui/ListOfContributors/components/ContributorsTable';
import { ConfigContributorsPage, PermissionState } from 'app/components/ui/ListOfContributors/types';
import { isAdminRole } from 'app/components/ui/ListOfContributors/utils';
import { useGetUserWithContributorQuery } from 'app/generated/graphql';
import { defaultNavigate } from 'common';
import { LOCStatus } from 'common/contributors';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDefaultContributors from '../common/useDefaultContributor';

export function UserContributorsOfUserPage() {
  let { userId } = useParams<Record<string, string | undefined>>();
  const { identity } = useAuthState();
  const toast = useToastStatus();
  const [viewLastYearList, setViewLastYearList] = useState<boolean>(false);
  const toggleLastYearList = () => setViewLastYearList(!viewLastYearList);
  const { data } = useGetUserWithContributorQuery({
    variables: {
      id: userId ? parseInt(userId) : 0,
    },
    skip: userId === undefined,
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });
  let isAdmin = isAdminRole(identity?.roles);
  let navigate = useNavigate();

  let status = data?.getOneUser?.listOfContributors?.status ?? null;

  let title = data
    ? `List Of Contributors - ${data?.getOneUser?.firstName} ${data?.getOneUser?.lastName}`
    : 'List Of Contributors';
  useDefaultContributors({ userState: data });

  const closeCallback = () => {
    defaultNavigate(navigate);
  };

  let pageConfig: ConfigContributorsPage = {
    LOCStatusAfterAddContributor: LOCStatus.IN_PROGRESS,
    isActionVisible: isAdmin,
    isSubmitVisible: isAdmin && status !== LOCStatus.APPROVED,
    sendReminder: true,
    closeCallback,
  };

  let permission: PermissionState = {
    canAdd: isAdmin && status !== LOCStatus.APPROVED,
    canDelete: isAdmin,
    canSubmit: isAdmin && status !== LOCStatus.APPROVED,
    canApprove: isAdmin && status === LOCStatus.SUBMITTED,
  };

  return (
    <ListOfContributors title={title} isDescriptionVisible={true} isToolVisible={viewLastYearList}>
      <ContributorsTable
        userId={userId ? parseInt(userId) : null}
        status={status}
        cycleContributorId={data?.getOneUser.listOfContributors?.id}
        permissions={permission}
        config={pageConfig}
        viewLastYearList={viewLastYearList}
        toggleLastYearList={toggleLastYearList}
      />
    </ListOfContributors>
  );
}

export default UserContributorsOfUserPage;
