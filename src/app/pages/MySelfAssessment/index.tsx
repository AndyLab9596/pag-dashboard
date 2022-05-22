import { Fragment } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'app/components/Auth/useAuthState';
import EvaluationBoilerPlate from 'app/components/ui/Evaluation/EvaluationBoilerPlate';
import ModalSaveConfirm from 'app/components/ui/Evaluation/EvaluationBoilerPlate/ModalSaveConfirm';
import { useGetUserEvaluationQuery } from 'app/generated/graphql';
import { EvaluationsStatus } from 'common/contributors';
import { EvaluationView } from 'app/components/ui/Evaluation/EvaluationView';
import Spinner from 'app/components/ui/Spinner';

export function MySelfAssessment() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { identity, loading } = useAuthState();

  const evaluateeId = identity?.id as number;
  const {
    data,
    loading: evaluationLoading,
    error: evaluationError,
    refetch,
  } = useGetUserEvaluationQuery({
    variables: {
      isEvaluationMode: true,
      isSelfAssessment: true,
      evaluateeId: evaluateeId,
    },
    fetchPolicy: 'no-cache',
    skip: loading,
    onError: _ => {
      onOpen();
    },
  });

  const evaluationStatus = !!data?.getOneEvaluation && data?.getOneEvaluation.status;

  const handleModalClose = () => {
    onClose();
    navigate(-1);
  };

  if (loading || evaluationLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Fragment>
      {data &&
        !!data.getOneEvaluation &&
        (evaluationStatus === EvaluationsStatus.COMPLETED ? (
          <EvaluationView data={data} isEvaluationMode={true} />
        ) : (
          <EvaluationBoilerPlate evaluation={data.getOneEvaluation} refetch={refetch} />
        ))}
      {/* Error modal  */}
      <ModalSaveConfirm
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={`Data error: \n${evaluationError?.message}.\nPlease contact your admin to create a new form`}
        confirmText="Close"
        onConfirm={handleModalClose}
        size={'2xl'}
      />
    </Fragment>
  );
}
