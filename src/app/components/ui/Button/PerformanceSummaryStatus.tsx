import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from 'app/components/Auth/useAuthState';
import { UserRole } from 'app/components/Auth/useRole';
import Button from 'app/components/ui/Button/Button';
import { RoutesPath } from 'app/routes/routesPath';

interface Props {
  psComplete?: boolean;
  evaluateeId: string;
  evaluatorId: string;
  percentageComplete: number;
}

const PerformanceSummaryStatus: React.FC<Props> = ({ psComplete, evaluateeId, evaluatorId, percentageComplete }) => {
  const { identity } = useAuthState();
  let navigate = useNavigate();

  let isDeptHeadRole = identity && identity.roles.filter(r => r.id === UserRole.DEPT_HEAD).length > 0;

  const handleClick = () => {
    navigate(RoutesPath.PERFORMANCE_SUMMARY_OF_USER.replace(':userId', evaluateeId));
  };

  if (psComplete) {
    return (
      <Button type="button" variant="link" color="#3f536e" fontWeight={500} onClick={handleClick}>
        Completed
      </Button>
    );
  }

  if (percentageComplete >= 66) {
    if (isDeptHeadRole && identity?.id !== parseInt(evaluatorId)) {
      return (
        <Button type="button" variant="solid" fontSize="13px" px="2rem" fontWeight={500} disabled>
          Finalize
        </Button>
      );
    }

    return (
      <Button type="button" variant="solid" fontSize="13px" px="2rem" fontWeight={500} onClick={handleClick}>
        Finalize
      </Button>
    );
  }

  return (
    <Button type="button" variant="link" color="#3f536e" fontWeight={500} cursor="not-allowed">
      {percentageComplete.toFixed()}% Complete
    </Button>
  );
};

export default PerformanceSummaryStatus;
