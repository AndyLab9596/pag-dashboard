import { useQuery as useApolloQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import useQuery from './useQuery';
import { GET_ONE_EVALUATION, GET_USER_EVALUATION } from 'graphql/evaluations';
import { GetOneEvaluationQuery } from 'app/generated/graphql';

interface UrlParams {
  userId?: string;
  evaluationId?: string;
}

export default function useEvaluationQuery() {
  const { userId, evaluationId } = useParams<keyof UrlParams>() as UrlParams;
  const { sa, cycleId, contributorId } = useQuery();

  let query = userId !== undefined && userId !== '0' ? GET_USER_EVALUATION : GET_ONE_EVALUATION;
  let variables =
    userId !== undefined && userId !== '0'
      ? {
          evaluateeId: +userId,
          isSelfAssessment: sa,
          cycleId: cycleId,
          contributorId,
        }
      : { id: !!evaluationId ? +evaluationId : 0 };

  const { data, error, loading, refetch } = useApolloQuery<GetOneEvaluationQuery>(query, {
    variables: variables,
  });

  return {
    data: data?.getOneEvaluation,
    error,
    loading,
    refetch,
  };
}

export type EvaluationResult = GetOneEvaluationQuery['getOneEvaluation'];
