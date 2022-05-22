import { Grid, GridItem } from '@chakra-ui/layout';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import React from 'react';
import Contributors from './Contributors';
import PerformanceEvaluations from './PerformanceEvaluations';
import SelfAssessment from './SelfAssessment';

export const DashboardEvaluation: React.FC = () => {
  return (
    <LayoutRightSide>
      <Grid gap="13px" templateColumns="repeat(3, 1fr)">
        <GridItem>
          <Contributors />
        </GridItem>
        <GridItem>
          <PerformanceEvaluations />
        </GridItem>
        <GridItem>
          <SelfAssessment />
        </GridItem>
      </Grid>
    </LayoutRightSide>
  );
};
