import { Box, VStack } from '@chakra-ui/react';
import useToastStatus from 'app/components/Toast/useToastHook';
import { Form } from 'app/components/ui/Form';
import Spinner from 'app/components/ui/Spinner';
import { EvaluationType, useGetOneEvaluationTypeQuery, useUpdateEvaluationTypeMutation } from 'app/generated/graphql';
import config from 'config';
import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import EvaluationTypeEditBody from './EvaluationTypeEditBody';
import EvaluationTypeEditHeader from './EvaluationTypeEditHeader';

export interface EvaluationQuestion {
  id: number;
  // updatedAt: any;
  title: string;
  subtitle: string;
  text: string;
  priority?: number | null;
  isOpenQuestion?: boolean | null;
  isRequired?: boolean | null;
  isNADisabled: boolean;
  isSelfAssessment?: boolean | null;
  isEvaluation?: boolean | null;
  isNoExposureComment?: boolean | null;
}
interface evaluationType {
  name: string;
  createdAt: string;
  questions: EvaluationQuestion[] | [];
}

export const EvaluationTypeEdit = () => {
  const toast = useToastStatus();

  const [isEditing, setIsEditting] = React.useState<boolean>(false);

  const [defaultValues, setDefaultValues] = React.useState<evaluationType>({
    name: '',
    createdAt: '',
    questions: [],
  });

  const { id } = useParams<{ id: string }>();

  const { data, loading, refetch } = useGetOneEvaluationTypeQuery({
    variables: { id: Number(id) },
    onCompleted: ({ getOneEvaluationType: data }) => {
      setDefaultValues({
        name: data.name,
        createdAt: dayjs(data.createdAt).format(config.DATE_FORMAT),
        questions: data.evaluationTypeQuestions ?? [],
      });
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const [updateEvaluationType, { loading: loadingUpdate }] = useUpdateEvaluationTypeMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  ///func to handle events
  const onSubmit = async values => {
    await updateEvaluationType({
      variables: {
        typeId: Number(id),
        data: {
          createdAt: values.createdAt,
          name: values.name,
          evaluationTypeQuestions: values.questions.map(q => ({
            id: q.id,
            title: q.title,
            subtitle: q.subtitle,
            text: q.text,
            isOpenQuestion: q.isOpenQuestion,
            isRequired: q.isRequired,
            isSelfAssessment: q.isSelfAssessment,
            isNADisabled: q.isNADisabled,
            isEvaluation: q.isEvaluation,
            priority: Number(q.priority),
            isNoExposureComment: q.isNoExposureComment,
          })),
        },
      },
    })
      .then(() => {
        toast({ status: 'success', title: 'Update form successfully!' });
        setIsEditting(false);
        refetch();
      })
      .catch(() => {
        toast({ status: 'error', title: 'Failed to update form!' });
      });
  };

  React.useEffect(() => {
    setDefaultValues({
      name: data?.getOneEvaluationType.name ?? '',
      createdAt: dayjs(data?.getOneEvaluationType.createdAt).format(config.DATE_FORMAT),
      questions: data?.getOneEvaluationType.evaluationTypeQuestions ?? [],
    });
  }, [JSON.stringify(data)]);

  const handleToggleEdit = () => {
    setIsEditting(!isEditing);
  };

  if (loading) {
    return (
      <div className="w-full mt-6 text-center">
        <Spinner />
      </div>
    );
  }

  const validationSchema = yup.object().shape({});

  const evaluationType = (data?.getOneEvaluationType as EvaluationType) ?? {};

  const createdDate = dayjs(evaluationType.createdAt).format(config.DATE_FORMAT);

  return (
    <Box p={5} width="full">
      <Form onSubmit={onSubmit} defaultValues={defaultValues} validationSchema={validationSchema}>
        <VStack align="stretch" spacing={5}>
          <EvaluationTypeEditHeader
            isEditing={isEditing}
            formTypeName={evaluationType.name}
            createdDate={createdDate}
            handleToggleEdit={handleToggleEdit}
          />
          <EvaluationTypeEditBody
            isEditing={isEditing}
            questionList={evaluationType.evaluationTypeQuestions}
            handleEditSubmit={onSubmit}
            isLoading={loadingUpdate}
          />
        </VStack>
      </Form>
    </Box>
  );
};
