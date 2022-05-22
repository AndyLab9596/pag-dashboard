import React from 'react';
import { Button } from '@chakra-ui/button';
import { useNavigate } from 'react-router-dom';

import { useUserPermissions } from 'common/useUserPermissions';
import { RoutesPath } from 'app/routes/routesPath';

interface Props {
  psComplete?: boolean;
  percentageComplete: number;
  evaluateeId: number;
  completePerformance?: number;
  totalPerformance?: number;
}

const PerformanceStatusButton: React.FC<Props> = ({
  psComplete,
  percentageComplete,
  evaluateeId,
  completePerformance,
  totalPerformance,
}) => {
  const { canViewEvaluationOrReportOf } = useUserPermissions();
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutesPath.PERFORMANCE_SUMMARY_OF_USER.replace(':userId', evaluateeId.toString()));
  };

  if (psComplete) {
    return (
      <Button
        type="button"
        variant="link"
        color="#3f536e"
        fontWeight={500}
        onClick={handleClick}
        disabled={!canViewEvaluationOrReportOf(evaluateeId)}
      >
        Completed
      </Button>
    );
  }

  if (percentageComplete >= 66) {
    return (
      <Button
        type="button"
        variant="solid"
        fontSize="13px"
        px="2rem"
        fontWeight={500}
        disabled={!canViewEvaluationOrReportOf(evaluateeId)}
        onClick={handleClick}
      >
        Finalize
      </Button>
    );
  }

  return (
    <Button type="button" variant="link" color="#3f536e" fontWeight={500} cursor="not-allowed">
      {completePerformance}/{totalPerformance} - {percentageComplete.toFixed()}% Complete
    </Button>
  );
};

export default PerformanceStatusButton;
