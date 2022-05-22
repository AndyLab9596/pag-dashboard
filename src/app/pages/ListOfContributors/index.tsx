import { Box } from '@chakra-ui/react';

import ListOfContributors from 'app/components/ui/ListOfContributors';
import { useAuthState } from 'app/components/Auth/useAuthState';
import ContributorsToApproveTable from './components/ContributorsToApproveTable';

export const ListOfContributorsPage = () => {
  const { identity } = useAuthState();

  let title = `${identity?.firstName} ${identity?.lastName} - List Of Contributors to Approve`;

  return (
    <ListOfContributors title={title} isDescriptionVisible={false}>
      <Box mb="20px" />
      <ContributorsToApproveTable />
    </ListOfContributors>
  );
};

export default ListOfContributorsPage;
