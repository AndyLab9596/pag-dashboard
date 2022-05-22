import { useAuthState } from 'app/components/Auth/useAuthState';
import { RoutesPath } from 'app/routes/routesPath';
import { useUserPermissions } from 'common/useUserPermissions';
import React from 'react';

interface Props {
  evaluateeId: number | null;
  cycleId?: number | null;
  isCompleted?: boolean;
  evaluationId?: number | null;
  onSavePreviousPage: () => void;
}

const SelfAssessmentLink: React.FC<Props> = ({
  evaluateeId,
  cycleId = null,
  isCompleted = false,
  evaluationId,
  onSavePreviousPage,
}) => {
  const { isAdminEditForm } = useUserPermissions();
  const { identity } = useAuthState();

  const isLimited =
    identity?.permissionsLimitedUsers && identity.permissionsLimitedUsers.find(lu => lu.limited?.id === evaluateeId);

  const handleViewSelfAssessment = () => {
    if (evaluateeId === null || !isAdminEditForm || !evaluationId) return;
    onSavePreviousPage();
    let baseLink = isCompleted
      ? RoutesPath.EVALUATIONS_VIEW.replace(':evaluationId', `${evaluationId}`)
      : RoutesPath.EVALUATIONS_EDIT.replace(':evaluationId', `${evaluationId}`);

    window.open(baseLink, '_blank');
  };

  if (isLimited || !isAdminEditForm) {
    return <span className="font-normal text-13">{isCompleted ? 'Completed' : 'In Progress'}</span>;
  }

  return (
    <span className="font-normal text-13 cursor-pointer underline" onClick={handleViewSelfAssessment}>
      {isCompleted ? 'Completed' : 'In Progress'}
    </span>
  );
};

export default SelfAssessmentLink;
