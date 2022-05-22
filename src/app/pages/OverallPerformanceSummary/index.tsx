import { useEffect, useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import EvaluationBlock from 'app/components/ui/EvaluationBlock';
import {
  useGetOneOverallPerformanceSummaryQuery,
  useUpdateOneOverallPerformanceSummaryMutation,
} from 'app/generated/graphql';
import Question from './components/Question';
import { Form } from 'app/components/ui/Form';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import StaticModal from 'app/components/Modal/StaticModal';
import { ModalProperties } from 'app/components/Modal/types';
import { RoutesPath } from 'app/routes/routesPath';
import { EvaluationsStatus } from 'common/contributors';

const validationSchema = yup.object().shape({});

interface Params {
  id: string;
}

interface FormValues {
  [id: string]: string; // answerId: feedback
}

export const OverallPerformanceSummaryPage = () => {
  return (
    <LayoutRightSide>
      <Form validationSchema={validationSchema}>
        <OverallPerformanceSummaryContent />
      </Form>
    </LayoutRightSide>
  );
};

const OverallPerformanceSummaryContent = () => {
  const { id } = useParams<keyof Params>() as Params;
  const toast = useToastStatus();
  const [requiredFeedbackIds, setRequiredFeedbackIds] = useState<string[]>([]);
  const [errorModalConfig, setErrorModalConfig] = useState<ModalProperties>();
  const {
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useFormContext();
  let navigate = useNavigate();

  const { onOpen: onOpenError, onClose: onCloseError, isOpen: isOpenError } = useDisclosure();
  const {
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
    isOpen: isOpenSuccess,
  } = useDisclosure({
    onClose: () => {
      navigate({
        pathname: RoutesPath.ACTION,
        search: '?mode=3',
      });
    },
  });

  const { data } = useGetOneOverallPerformanceSummaryQuery({
    variables: {
      getOneOverallPerformanceSummaryId: parseInt(id),
    },
    onError: error => {
      toast({
        status: 'error',
        title: error.message,
      });
    },
    onCompleted: data => {
      let requiredFeedback = data.getOneOverallPerformanceSummary.overallPerformanceSummaryAnswers
        .filter(item => item.evaluationTypeQuestion?.isRequired && item.evaluationTypeQuestion?.isEvaluation)
        .map(item => item.id.toString());

      setRequiredFeedbackIds(requiredFeedback);
    },
  });

  const [updateOps, { loading: updateLoading }] = useUpdateOneOverallPerformanceSummaryMutation({
    fetchPolicy: 'no-cache',
    onError: error => {
      toast({
        status: 'error',
        title: error.message,
      });
    },
  });

  const isViewOnly = !!data?.getOneOverallPerformanceSummary?.isShare;

  const validateFeedback = (values: FormValues) => {
    let isFeedbackValid = true;
    requiredFeedbackIds.forEach(item => {
      if (!values[item] || values[item].trim().split(' ').length < 3) {
        isFeedbackValid = false;
        setError(item, {
          type: 'required',
          message: 'Mandatory comments require three words',
        });
      }
    });

    return isFeedbackValid;
  };

  const validateAnswers = () => {
    let answers = data?.getOneOverallPerformanceSummary.overallPerformanceSummaryAnswers;
    let isError = answers?.some(item => !item.evaluationTypeQuestion);
    if (isError) {
      setErrorModalConfig({
        body: 'Data error! missing evaluationTypeQuestion/evaluationTypeQuestionId field! Please contact your admin to create a new form',
        closeButtonText: 'Close',
      });
      onOpenError();
    }

    return isError;
  };

  const convertValues = (values: FormValues) => {
    return Object.keys(values).map(key => ({
      id: parseInt(key),
      feedback: values[key],
    }));
  };

  useEffect(() => {
    if (!isDirty || isViewOnly) return;

    const interval = setInterval(async () => {
      handleSubmit(onSubmit(true))();
    }, 5 * 60 * 1000); // 5 mins

    return () => interval && clearInterval(interval);
  }, [isDirty]);

  const onSubmit = (isAutoSave: boolean) => async (values: FormValues) => {
    if (!isAutoSave) {
      let isError = validateAnswers();
      if (isError) return;

      let isValid = validateFeedback(values);
      if (!isValid) return;
    }

    let opsAnswers = convertValues(values);
    try {
      await updateOps({
        variables: {
          updateOneOverallPerformanceSummaryId: parseInt(id),
          data: {
            overallPerformanceSummaryAnswers: opsAnswers,
            status: EvaluationsStatus.IN_PROGRESS,
          },
        },
      });
      !isAutoSave && onOpenSuccess();
    } catch (error) {}
  };

  return (
    <LayoutRightSide>
      {!isViewOnly && (
        <Button
          mx="0.9rem"
          mb="-10px"
          mt="0.9rem"
          minW="100px"
          isLoading={updateLoading}
          onClick={handleSubmit(onSubmit(false))}
        >
          Save
        </Button>
      )}
      <EvaluationBlock
        variant="overallPS"
        evaluatee={data?.getOneOverallPerformanceSummary.user}
        startDate={new Date().toDateString()}
      />
      <Box pb="2rem">
        {data?.getOneOverallPerformanceSummary.overallPerformanceSummaryAnswers
          .filter(item => item.evaluationTypeQuestion?.isEvaluation)
          .sort((a, b) => (a.evaluationTypeQuestion?.id ?? 0) - (b.evaluationTypeQuestion?.id ?? 0))
          .map(item => (
            <Question key={item.id} data={item} isViewOnly={isViewOnly} />
          ))}
        {!isViewOnly && (
          <Button
            type="submit"
            mx="0.9rem"
            minW="100px"
            onClick={handleSubmit(onSubmit(false))}
            isLoading={updateLoading}
          >
            Save
          </Button>
        )}
      </Box>
      <StaticModal isOpen={isOpenError} onClose={onCloseError} config={errorModalConfig} />
      <StaticModal isOpen={isOpenSuccess} onClose={onCloseSuccess} variant="successSave" />
    </LayoutRightSide>
  );
};

export default OverallPerformanceSummaryPage;
