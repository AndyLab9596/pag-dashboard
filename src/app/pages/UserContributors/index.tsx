import { useParams } from 'react-router-dom';
import { useGetUserWithContributorQuery } from 'app/generated/graphql';
import { useAuthState } from 'app/components/Auth/useAuthState';
import ListOfContributors from 'app/components/ui/ListOfContributors';
import ContributorsTable from 'app/components/ui/ListOfContributors/components/ContributorsTable';
import useDefaultContributors from './common/useDefaultContributor';
import type { ConfigContributorsPage, PermissionState } from 'app/components/ui/ListOfContributors/types';
import { LOCStatus } from 'common/contributors';
import useToastStatus from 'app/components/Toast/useToastHook';
import { useState } from 'react';

export function UserContributorsPage() {
  let { userId } = useParams<Record<string, string | undefined>>();
  const { identity } = useAuthState();
  const toast = useToastStatus();
  const [viewLastYearList, setViewLastYearList] = useState<boolean>(false);
  const toggleLastYearList = () => setViewLastYearList(!viewLastYearList);
  const { data, refetch } = useGetUserWithContributorQuery({
    variables: {
      id: userId ? parseInt(userId) : identity?.id ?? 0,
    },
    // fetchPolicy: 'no-cache',
    skip: !userId && !identity?.id,
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });

  let status = data?.getOneUser?.listOfContributors?.status ?? null;

  let title = data
    ? `My List Of Contributors - ${identity?.firstName} ${identity?.lastName}`
    : 'My List Of Contributors';

  const handleDisableRow = (original: any) => {
    return original?.id && original.id === data?.getOneUser?.evaluator?.id;
  };

  // get all contributorsId + this userId if have
  const allContributorsId: number[] = (
    data?.getOneUser?.listOfContributors?.cycleContributorsUser?.map(contributor => contributor.user.id) ?? []
  ).concat(identity ? identity!.id! : []);

  const closeCallback = () => {
    refetch();
  };

  const pageConfig: ConfigContributorsPage = {
    LOCStatusAfterAddContributor: LOCStatus.IN_PROGRESS,
    isActionVisible: true,
    isSubmitVisible: status !== LOCStatus.SUBMITTED && status !== LOCStatus.APPROVED,
    sendReminder: false,
    handleDisableRow,
    closeCallback,
  };

  let permission: PermissionState = {
    canAdd: status !== LOCStatus.SUBMITTED && status !== LOCStatus.APPROVED,
    canDelete: status !== LOCStatus.SUBMITTED && status !== LOCStatus.APPROVED,
    canSubmit: status !== LOCStatus.SUBMITTED && status !== LOCStatus.APPROVED,
    canApprove: false,
  };

  useDefaultContributors({ userState: data });

  return (
    <ListOfContributors title={title} isDescriptionVisible={true} isToolVisible={viewLastYearList}>
      {data && (
        <ContributorsTable
          userId={userId ? parseInt(userId) : identity?.id ?? 0}
          status={status}
          cycleContributorId={data?.getOneUser.listOfContributors?.id}
          permissions={permission}
          config={pageConfig}
          skipUsers={allContributorsId}
          evaluatorId={data?.getOneUser?.evaluator?.id}
          viewLastYearList={viewLastYearList}
          toggleLastYearList={toggleLastYearList}
        />
      )}
    </ListOfContributors>
  );
}

export default UserContributorsPage;
