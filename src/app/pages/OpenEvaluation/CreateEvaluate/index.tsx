import { Box } from '@chakra-ui/react';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import Spinner from 'app/components/ui/Spinner';
import { useGetOpenEvaluationLazyQuery, useGetPreCycleQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CreateEvaluateProps {
  evaluateeId: number;
  lastPromotionCycleId?: number | null;
}

const CreateEvaluate = ({ evaluateeId, lastPromotionCycleId }: CreateEvaluateProps) => {
  const navigate = useNavigate();
  const toast = useToastStatus();
  const { data: preCycleData, loading: preCycleLoading } = useGetPreCycleQuery({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [getOpenEvaluation, { loading: queryLoading }] = useGetOpenEvaluationLazyQuery({
    onCompleted: ({ getOpenEvaluation: data }) => {
      const evaluationId = data.id;
      const preCycleId = preCycleData?.getPreCycle?.id;

      if (evaluationId) {
        if (!!lastPromotionCycleId) {
          const isUserPromoted = lastPromotionCycleId === preCycleId;
          const path =
            RoutesPath.EVALUATIONS_EDIT.replace(':evaluationId', `${evaluationId}`) + `?promoted=${isUserPromoted}`;
          navigate(path, { state: { isEvaluationMode: true } });
        }
        navigate(RoutesPath.EVALUATIONS_EDIT.replace(':evaluationId', `${evaluationId}`) + `?promoted=false`, {
          state: { isEvaluationMode: true },
        });
      }
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const handleEvaluate = () => {
    getOpenEvaluation({
      variables: {
        evaluateeId: evaluateeId,
      },
    });
  };

  if (!evaluateeId || queryLoading || preCycleLoading) {
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner />
    </div>;
  }

  return (
    <Box marginTop={'30px'}>
      <Button onClick={handleEvaluate}>Evaluatee</Button>
    </Box>
  );
};

export default CreateEvaluate;
