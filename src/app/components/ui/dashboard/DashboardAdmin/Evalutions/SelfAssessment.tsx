import useToastStatus from 'app/components/Toast/useToastHook';
import { useSelfAssessmentsQuery } from 'app/generated/graphql';
import React from 'react';
import EvaluationBox from './EvaluationBox';

interface SelfAssessmentItemsProps {
  strategyId?: number;
  departmentIds?: number[];
}

const SelfAssessment: React.FC<SelfAssessmentItemsProps> = ({ strategyId, departmentIds }) => {
  const toast = useToastStatus();

  const { data } = useSelfAssessmentsQuery({
    variables: { strategyId, departmentIds },
    fetchPolicy: 'no-cache',
    onError: error => {
      toast({
        status: 'error',
        title: error.message,
      });
    },
  });

  const selfAssessment = data?.selfAssessments;

  return (
    <EvaluationBox
      title="Self - Assessments"
      complete={selfAssessment?.complete}
      overall={selfAssessment?.overall}
      percentComplete={selfAssessment?.percentComplete ?? 0}
      color="#00B5CC"
    />
  );
};

export default SelfAssessment;
