import { Grid, GridItem } from '@chakra-ui/react';
import { useUserPermissions } from 'common/useUserPermissions';
import React from 'react';
import ListPerformance from './ListPerformance/ListPerformance';
import PerformanceSummaries from './PerformanceSummary/PerformanceSummaries';

const PerformanceEvaluations: React.FC = () => {
  const { isUser, isCityAdmin, isCountryAdmin, isSpecialAdmin, isHead, isEvaluator } = useUserPermissions();

  return (
    <Grid gap="13px">
      <GridItem>
        <ListPerformance />
      </GridItem>
      {((isUser && !(isSpecialAdmin || isCityAdmin || isCountryAdmin)) || isEvaluator || isHead) && (
        <GridItem h="740px">
          <PerformanceSummaries />
        </GridItem>
      )}
    </Grid>
  );
};
export default PerformanceEvaluations;
