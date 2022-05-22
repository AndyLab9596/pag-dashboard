import useToastStatus from 'app/components/Toast/useToastHook';
import { usePerformanceEvaluationQuery } from 'app/generated/graphql';
import React from 'react';
import EvaluationBox from './EvaluationBox';

interface PerformanceItemsProps {
  strategyId?: number;
  departmentIds?: number[];
}

const PerformanceEvaluations: React.FC<PerformanceItemsProps> = ({ strategyId, departmentIds }) => {
  const toast = useToastStatus();

  const { data } = usePerformanceEvaluationQuery({
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

  const performanceEvaluation = data?.performanceEvaluation;

  return (
    <EvaluationBox
      title="Performance Evaluations"
      complete={performanceEvaluation?.complete}
      overall={performanceEvaluation?.overall}
      percentComplete={performanceEvaluation?.percentComplete ?? 0}
      color="#000080"
    />
  );
};

export default PerformanceEvaluations;
