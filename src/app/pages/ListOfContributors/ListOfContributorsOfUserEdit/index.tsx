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

export function ListOfContributorsOfUserEditPage() {
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
    ? `Your List Of Contributors - ${data?.getOneUser?.firstName} ${data?.getOneUser?.lastName}`
    : 'Your List Of Contributors';

  const closeCallback = () => {
    defaultNavigate(navigate);
  };

  const pageConfig: ConfigContributorsPage = {
    LOCStatusAfterAddContributor: LOCStatus.SUBMITTED,
    isActionVisible: isAdmin && status === LOCStatus.SUBMITTED,
    isSubmitVisible: isAdmin && status === LOCStatus.SUBMITTED,
    sendReminder: false,
    closeCallback,
  };

  let permission: PermissionState = {
    canAdd: isAdmin,
    canDelete: isAdmin,
    canSubmit: false,
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

export default ListOfContributorsOfUserEditPage;
