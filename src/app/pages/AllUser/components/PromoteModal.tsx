import { ApolloQueryResult } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import useToastStatus from 'app/components/Toast/useToastHook';
import { GetAllUsersWithDetailQuery, useGetOneUsersQuery, usePromoteUserMutation } from 'app/generated/graphql';
import { GET_PROFILE_USER_BY_ID } from 'graphql/user';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { SelectEvaluationTypesField } from './SelectEvaluationTypeField';
import { SelectTitlesField } from './SelectTitlesField';

const validationSchema = yup.object().shape({
  newTitle: yup
    .object()
    .shape({
      value: yup.number(),
      label: yup.string(),
    })
    .nullable()
    .required('New Title is required'),
  formType: yup
    .object()
    .shape({
      value: yup.number(),
      label: yup.string(),
    })
    .nullable()
    .required('Form Type is required'),
});

interface PromoteModalProps {
  onClose: () => void;
  refetch: () => Promise<ApolloQueryResult<GetAllUsersWithDetailQuery>>;
}

const PromoteModal: React.FC<PromoteModalProps> = ({ refetch, onClose }) => {
  const toast = useToastStatus();
  const { userId } = useParams<{ userId: string | undefined }>();
  const isEdit = Boolean(userId);
  const { loading, data } = useGetOneUsersQuery({
    skip: !userId,
    variables: {
      id: parseFloat(userId as string),
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const [promoteUserMutation, { loading: loadingUpdate }] = usePromoteUserMutation({
    refetchQueries: [
      userId
        ? {
            query: GET_PROFILE_USER_BY_ID,
            variables: {
              userId: +userId,
            },
          }
        : '',
    ],
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const defaultValues = () => {
    if (isEdit) {
      return {
        currentTitle: {
          label: data?.getOneUser?.title?.name,
          value: data?.getOneUser?.title?.id,
        },
        newTitle: '',
        formType: {
          label: data?.getOneUser?.evaluationType?.name,
          value: data?.getOneUser?.evaluationType?.id,
        },
      };
    }
  };
  const onSubmit = async values => {
    if (isEdit) {
      await promoteUserMutation({
        variables: {
          id: +userId!,
          data: {
            titleId: values.newTitle.value,
            evaluationTypeId: values.formType.value,
          },
        },
      });
      onClose();
      await refetch();
    }
  };

  return (
    <ModalCreateEdit
      isOpen={true}
      onClose={onClose}
      isCentered={false}
      size="lg"
      scrollBehavior="outside"
      formProps={{
        onSubmit: onSubmit,
        validationSchema: validationSchema,
        defaultValues: defaultValues(),
      }}
      isLoading={loadingUpdate}
      isLoadingModal={loading}
      modalTitle={`Promote User`}
      modalBody={
        <Box className="grid gap-10 my-10">
          <SelectTitlesField isDisabled name="currentTitle" label="Current Title" />
          <SelectTitlesField placeholder="Select New Title" name="newTitle" label="New Title" />
          <SelectEvaluationTypesField placeholder="Select Form Type" name="formType" label="Form Type" />
        </Box>
      }
    />
  );
};

export default PromoteModal;
