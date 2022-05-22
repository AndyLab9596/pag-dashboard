import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { HStack } from '@chakra-ui/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import EvaluationBlock from 'app/components/ui/EvaluationBlock';
import {
  useGetPreCycleQuery,
  useGetPerformanceSummaryDetailsQuery,
  useGetUserEvaluateeQuery,
  useExportPerformanceSummaryLazyQuery,
} from 'app/generated/graphql';
import EvaluationSummary from './components/EvaluationSummary';
import { AnswerOfContributor, FormValues, OptOutEvaluation } from './types';
import OptOutComments from './components/OptOutComments';
import { Form } from 'app/components/ui/Form';
import Feedback from './components/Feedback';
import PrintBtn from 'app/components/ui/ExportImport/PrintBtn';
import StaticModal from 'app/components/Modal/StaticModal';
import { RoutesPath } from 'app/routes/routesPath';
import Loader from 'app/components/Loader/Loader';
import config from 'config';

const validationSchema = yup.object().shape({
  score: yup.string().required('Score is required'),
  feedback: yup.string().min(5, 'Too Short!').required('Feedback is required'),
});

interface Params {
  userId: string;
}

export const PerformanceSummaryDetailsPage = () => {
  const { userId } = useParams<keyof Params>() as Params;
  const { search } = useLocation();
  let query = new URLSearchParams(search);
  const cycleId = query.get('cycleId');

  const {
    data,
    error,
    loading: psLoading,
  } = useGetPerformanceSummaryDetailsQuery({
    variables: {
      userId: +userId,
      cycleId: cycleId ? +cycleId : undefined,
    },
    skip: isNaN(+userId),
  });
  const psId = data?.getPerformanceSummaryDetails?.performanceSummary.id as number;

  const { data: userData, loading: userLoading } = useGetUserEvaluateeQuery({
    variables: {
      id: +userId,
    },
    skip: isNaN(+userId),
  });

  // const { data: cycles } = useGetAllCyclesQuery();
  const { data: preCycle } = useGetPreCycleQuery();

  const [exportPS, { data: exportData, loading: exportLoading, error: exportError }] =
    useExportPerformanceSummaryLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        let url = data.exportPerformanceSummary.url;
        window.open(`${config.REST_APP_API_URL}/exports?url=${url}`, '_blank');
      },
    });

  const [optOutEvaluations, setOptOutEvaluations] = useState<OptOutEvaluation[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(true);
  const [isUserPromoted, setIsUserPromoted] = useState<boolean>(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (!data) return;

    const optOutList: OptOutEvaluation[] = data?.getPerformanceSummaryDetails?.evaluations.filter(e => e.optOut) ?? [];
    setOptOutEvaluations(optOutList);
    setIsComplete(data?.getPerformanceSummaryDetails?.performanceSummary?.isComplete ?? false);
  }, [data]);

  useEffect(() => {
    if (!data || !preCycle || !userData) return;

    let preCycleId = preCycle.getPreCycle?.id;
    let lastPromotionCycleId = userData.getOneUser.lastPromotionCycleId;
    if (preCycleId && lastPromotionCycleId && preCycleId === lastPromotionCycleId) {
      setIsUserPromoted(true);
    }
  }, [data, preCycle, userData]);

  // form
  const defaultValues: FormValues = {
    feedback: data?.getPerformanceSummaryDetails?.performanceSummary?.feedback ?? '',
    score: `${data?.getPerformanceSummaryDetails?.performanceSummary?.score}` ?? '',
    isSubmit: false,
    isAutoSave: false,
    psId: data?.getPerformanceSummaryDetails?.performanceSummary?.id ?? null,
  };

  const onPrint = () => {
    exportPS({
      variables: {
        payload: {
          withNames: true,
          withNormalization: true,
        },
        filter: {
          userIds: [+userId],
          isSelectAll: false,
        },
      },
    });
  };

  // ERROR
  if (error || isNaN(+userId)) {
    return (
      <StaticModal
        isOpen={true}
        onClose={() => navigate(RoutesPath.DASHBOARD, { replace: true })}
        config={{
          title: 'Error',
          body: error?.message ?? 'Performance Summary not found',
          closeButtonText: 'Close',
        }}
      />
    );
  }

  if (psLoading || userLoading) {
    return (
      <LayoutRightSide>
        <Loader isLoading={true} />
      </LayoutRightSide>
    );
  }

  return (
    <LayoutRightSide>
      <HStack justifyContent="flex-end" mt="1rem" mr="1rem">
        <PrintBtn onClick={onPrint} completed={!!exportData} isLoading={exportLoading} error={exportError?.message} />
      </HStack>
      {userData?.getOneUser && (
        <EvaluationBlock
          evaluatee={userData?.getOneUser}
          startDate={dayjs(userData?.getOneUser.updatedAt).toString()}
          variant="perfSummary"
          isUserPromoted={isUserPromoted}
        />
      )}

      {data?.getPerformanceSummaryDetails?.questionSummary.map(q => {
        const answers = data?.getPerformanceSummaryDetails?.evaluations
          .filter(evaluation => {
            return !!evaluation?.evaluationAnswers && evaluation.evaluationAnswers.length > 0;
          })
          .map(evaluation => {
            let result: AnswerOfContributor = {
              contributor: evaluation.contributor,
              answer: evaluation?.evaluationAnswers?.find(ans => ans?.evaluationTypeQuestion?.id === q.question.id),
            };

            return result;
          });

        return <EvaluationSummary key={q.question.id} question={q} answers={answers} />;
      })}
      <OptOutComments data={optOutEvaluations} />
      <Form validationSchema={validationSchema} defaultValues={defaultValues}>
        <Feedback name={userData?.getOneUser?.name ?? ''} isComplete={isComplete} psId={psId} />
      </Form>
    </LayoutRightSide>
  );
};

export default PerformanceSummaryDetailsPage;
