import { Box } from '@chakra-ui/react';

import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import PerfSummaryList from './components/PerfSummaryList';

export const PerformanceSummaryPage = () => {
  return (
    <LayoutRightSide>
      <Box
        border="1px solid #a8c6df"
        borderRadius="4px"
        display="flex"
        flexDirection="column"
        gridRowGap="10px"
        mt="1.5rem"
      >
        <Box justifyContent="space-between" pt="13px" px="13px" pb="20px">
          <Box as="h1" fontSize="17px" lineHeight="22px">
            Performance Summaries
          </Box>
        </Box>
        <PerfSummaryList />
      </Box>
    </LayoutRightSide>
  );
};

export default PerformanceSummaryPage;
