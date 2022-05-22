import { useOverallProgressQuery } from 'app/generated/graphql';
import React from 'react';
import EvaluationBox from './EvaluationBox';
import useToastStatus from 'app/components/Toast/useToastHook';

interface PerformanceItemsProps {
  strategyId?: number;
  departmentIds?: number[];
}

const OverAllProgress: React.FC<PerformanceItemsProps> = ({ strategyId, departmentIds }) => {
  const toast = useToastStatus();

  const { data } = useOverallProgressQuery({
    variables: {
      strategyId,
      departmentIds,
    },
    fetchPolicy: 'no-cache',
    onError: error => {
      toast({
        status: 'error',
        title: error.message,
      });
    },
  });

  const overAllProgress = data?.overallProgress;

  return (
    <EvaluationBox
      title="Overall Progress"
      complete={overAllProgress?.complete}
      overall={overAllProgress?.overall}
      percentComplete={overAllProgress?.percentComplete ?? 0}
      color="#000080"
    />
  );
};

export default OverAllProgress;
