import { GridItem, SimpleGrid } from '@chakra-ui/react';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import React from 'react';
import '../style.scss';
import Evaluations from './Evalutions/Evaluations';
import KeyDates from './KeyDates/KeyDates';
import PendingLOCApprovalFor from './PeddingLOCAproval/PendingLOCApprovalFor';
import PerformanceEvaluations from './PerformanceEvaluations/PerformanceEvaluations';
import Ratings from './Ratings/Ratings';
import Reminder from './Reminders';

export const DashboardAdmin: React.FC = () => {
  return (
    <LayoutRightSide>
      <SimpleGrid w="100%" gap="13px" columns={4} rows={{ sm: 4, xl: 2 }} templateRows="auto 1fr 1fr auto">
        <GridItem
          colSpan={{
            sm: 4,
            md: 4,
            lg: 4,
            xl: 2,
          }}
        >
          <Evaluations />
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={{
            sm: 2,
            xl: 1,
          }}
        >
          <KeyDates />
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={{
            sm: 2,
            xl: 1,
          }}
        >
          <Reminder />
        </GridItem>
        <GridItem
          colSpan={{
            sm: 2,
            xl: 1,
          }}
        >
          <Ratings />
        </GridItem>
        <GridItem
          colSpan={{
            sm: 2,
            xl: 1,
          }}
        >
          <PerformanceEvaluations />
        </GridItem>
        <GridItem
          colSpan={{
            sm: 2,
            xl: 1,
          }}
        >
          <PendingLOCApprovalFor />
        </GridItem>
      </SimpleGrid>
    </LayoutRightSide>
  );
};
