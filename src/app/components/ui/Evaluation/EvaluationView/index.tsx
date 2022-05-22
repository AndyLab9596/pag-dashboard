import { useMemo } from 'react';
import { ApolloError } from '@apollo/client';
import { Box, useDisclosure } from '@chakra-ui/react';
import Spinner from 'app/components/ui/Spinner';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import StaticModal from 'app/components/Modal/StaticModal';
import useToastStatus from 'app/components/Toast/useToastHook';
import Export from 'app/components/ui/ExportImport/ExportBtn';
import { GetUserEvaluationQuery, useExportSAsLazyQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { useNavigate } from 'react-router-dom';
import EvaluationBlock from '../../EvaluationBlock';
import EvaluateQuestAns from './EvaluateQuestAns';

interface Props {
  data?: GetUserEvaluationQuery;
  loading?: boolean;
  error?: ApolloError;
  isEvaluationMode?: boolean;
}

export function EvaluationView(props: Props) {
  const { data, error, loading, isEvaluationMode = false } = props;
  const toast = useToastStatus();
  let navigate = useNavigate();
  const evaluatee = !!data?.getOneEvaluation && data.getOneEvaluation.evaluatee;
  const isVariantSelfAssessment = !!data?.getOneEvaluation && data.getOneEvaluation.isSelfAssessment;

  // only show Question-answer if != null
  const evaluationAnswer = useMemo(
    () =>
      data && !!data.getOneEvaluation
        ? data?.getOneEvaluation?.evaluationAnswers?.filter(value => {
            return !!value?.evaluationTypeQuestion;
          })
        : [],
    [data],
  );

  // Export SA: only for evaluation type SA
  const { isOpen: isOpenExport, onOpen: onOpenExport, onClose: onCloseExport } = useDisclosure();
  const [exportSA] = useExportSAsLazyQuery({
    onCompleted: ({ exportSAs: { url } }) => {
      window.open(url);
      onOpenExport();
    },
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
    fetchPolicy: 'no-cache',
  });

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <StaticModal
        isOpen={true}
        onClose={() => navigate(RoutesPath.DASHBOARD, { replace: true })}
        config={{
          title: 'Evaluation not found',
          closeButtonText: 'Close',
        }}
      />
    );
  }

  return (
    <LayoutRightSide>
      {isVariantSelfAssessment && (
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
          <Export
            title="Evaluation View"
            onDownload={onClose => {
              evaluatee &&
                exportSA({
                  variables: {
                    filter: {
                      userIds: [evaluatee.id],
                      isSelectAll: false,
                    },
                    payload: {
                      isEvaluationMode,
                    },
                  },
                });
              onClose();
            }}
          />
        </Box>
      )}

      <EvaluationBlock
        evaluatee={evaluatee ? evaluatee : null}
        variant={isVariantSelfAssessment ? 'selfAssessment' : 'evaluation'}
      />
      {evaluationAnswer && <EvaluateQuestAns questAnsArr={evaluationAnswer} />}
      <StaticModal isOpen={isOpenExport} onClose={onCloseExport} variant="successExport" />
    </LayoutRightSide>
  );
}
