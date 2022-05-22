import useToastStatus from 'app/components/Toast/useToastHook';
import EvaluationBoilerPlate from 'app/components/ui/Evaluation/EvaluationBoilerPlate';
import { EvaluationView } from 'app/components/ui/Evaluation/EvaluationView';
import Spinner from 'app/components/ui/Spinner';
import { useGetUserEvaluationQuery } from 'app/generated/graphql';
import { EvaluationsStatus } from 'common/contributors';
import React, { Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface Params {
  evaluationId: string;
}

interface StateProps {
  isEvaluationMode?: boolean;
}

export function EvaluationEdit() {
  const toast = useToastStatus();
  const location = useLocation();
  const isEvaluationMode = (location.state as StateProps)?.isEvaluationMode ?? false;
  const { evaluationId } = useParams<keyof Params>() as Params;

  const { data, loading, refetch } = useGetUserEvaluationQuery({
    variables: {
      evaluationId: +evaluationId,
      isEvaluationMode,
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  if (loading) {
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
        (data.getOneEvaluation.status === EvaluationsStatus.COMPLETED ? (
          <EvaluationView data={data} isEvaluationMode={true} />
        ) : (
          <EvaluationBoilerPlate evaluation={data.getOneEvaluation} refetch={refetch} />
        ))}
      {/* Error modal  */}
    </Fragment>
  );
}
