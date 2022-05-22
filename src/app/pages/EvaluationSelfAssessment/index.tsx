import { Box } from '@chakra-ui/react';
import { useAuthState } from 'app/components/Auth/useAuthState';
import EvaluationSelfAssessment from 'app/components/ui/EvaluationSeflAssessment';
import SelfAssessmentTable from './components/SelfAssessmentTable';

export function EvaluationSelfAssessmentPage() {
  const { identity } = useAuthState();

  let title = `Self Assessment List - ${identity?.firstName} ${identity?.lastName}`;

  return (
    <EvaluationSelfAssessment title={title} isDescriptionVisible={false}>
      <Box mb="20px" />
      <SelfAssessmentTable />
    </EvaluationSelfAssessment>
  );
}
