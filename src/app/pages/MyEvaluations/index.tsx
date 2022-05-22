import { Box } from '@chakra-ui/react';

import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import MyEvaluationsHeader from './components/MyEvaluationsHeader';
import MyEvaluationsTable from './components/MyEvaluationsTable';
import { useGetMyEvaluationsQuery } from 'app/generated/graphql';
import useToastStatus from 'app/components/Toast/useToastHook';

export const MyEvaluationsPage = () => {
  const toast = useToastStatus();

  const { data, loading, refetch } = useGetMyEvaluationsQuery({
    variables: {
      page: 1,
      sort: {
        field: 'name',
        order: 'ASC',
      },
    },
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  return (
    <LayoutRightSide>
      <Box
        border="1px solid #a8c6df"
        borderRadius="4px"
        display="flex"
        flexDirection="column"
        gridRowGap="10px"
        pt="20px"
      >
        <MyEvaluationsHeader refetch={refetch} />
        <MyEvaluationsTable data={data} loading={loading} refetch={refetch} />
      </Box>
    </LayoutRightSide>
  );
};

export default MyEvaluationsPage;
