import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import ListOfContributors from 'app/components/ui/ListOfContributors';
import { useGetUserWithContributorQuery } from 'app/generated/graphql';
import ContributorsTable from 'app/components/ui/ListOfContributors/components/ContributorsTable';
import Action from './components/Action';
import { ConfigContributorsPage, PermissionState } from 'app/components/ui/ListOfContributors/types';
import useToastStatus from 'app/components/Toast/useToastHook';
import { LOCStatus } from 'common/contributors';
import { useState } from 'react';

export const ListOfContributorsOfUserPage = () => {
  let { userId } = useParams<Record<string, string | undefined>>();
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

  let status = data?.getOneUser?.listOfContributors?.status ?? null;
  let title = `List Of Contributors - ${data?.getOneUser?.firstName} ${data?.getOneUser?.lastName}`;

  const pageConfig: ConfigContributorsPage = {
    isActionVisible: false,
    isSubmitVisible: false,
    sendReminder: false,
  };

  let permission: PermissionState = {
    canAdd: false,
    canDelete: false,
    canSubmit: false,
    canApprove: false,
  };

  return (
    <ListOfContributors title={title} isDescriptionVisible={false} isToolVisible={true}>
      <Box mb="20px" />
      <ContributorsTable
        userId={userId ? parseInt(userId) : null}
        status={status}
        cycleContributorId={data?.getOneUser.listOfContributors?.id}
        permissions={permission}
        config={pageConfig}
        viewLastYearList={viewLastYearList}
        toggleLastYearList={toggleLastYearList}
      >
        {userId && status === LOCStatus.SUBMITTED ? (
          <Action userId={parseInt(userId)} cycleContributorId={data?.getOneUser?.listOfContributors?.id} />
        ) : (
          <></>
        )}
      </ContributorsTable>
    </ListOfContributors>
  );
};

export default ListOfContributorsOfUserPage;
