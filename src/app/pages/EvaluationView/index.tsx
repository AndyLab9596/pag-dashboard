import { useGetUserEvaluationQuery } from 'app/generated/graphql';
import { useLocation, useParams } from 'react-router-dom';
import { EvaluationView } from 'app/components/ui/Evaluation/EvaluationView';

interface Params {
  evaluationId: string;
}

interface StateProps {
  isEvaluationMode?: boolean;
}

export function EvaluationViewPage() {
  const location = useLocation();
  const isEvaluationMode = (location.state as StateProps)?.isEvaluationMode ?? false;

  const { evaluationId } = useParams<keyof Params>() as Params;

  const { data, loading, error } = useGetUserEvaluationQuery({
    variables: {
      evaluationId: +evaluationId,
      isEvaluationMode,
    },
  });

  return <EvaluationView data={data} loading={loading} error={error} isEvaluationMode={isEvaluationMode} />;
}
