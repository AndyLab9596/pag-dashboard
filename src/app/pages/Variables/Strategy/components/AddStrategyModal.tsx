import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import useToastStatus from 'app/components/Toast/useToastHook';
import { InputField } from 'app/components/ui/Form';
import { useAddOneStrategyMutation, useGetOneStrategyQuery, useUpdateOneStrategyMutation } from 'app/generated/graphql';
import { GET_ALL_STRATEGIES } from 'graphql/strategy';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { VariablesContext } from '../..';
const validationSchema = yup.object().shape({
  name: yup.string().strict(false).trim().required('Strategy Name is required'),
});

interface AddStrategyModalProps {
  onClose: () => void;
  currentPage?: number;
}

const AddStrategyModal: React.FC<AddStrategyModalProps> = ({ currentPage = 1, onClose }) => {
  const toast = useToastStatus();
  const { onOpenSave } = useContext(VariablesContext);
  const { strategyId } = useParams<{ strategyId: string | undefined }>();
  const [addOneStrategyMutation, { loading: loadingAdd }] = useAddOneStrategyMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [updateOneStrategyMutation, { loading: loadingUpdate }] = useUpdateOneStrategyMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const isEdit = Boolean(strategyId);
  const { loading, data } = useGetOneStrategyQuery({
    skip: !strategyId,
    variables: {
      id: parseFloat(strategyId as string),
    },
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
        name: data?.getOneStrategy.name,
      };
    }
    return {
      name: '',
    };
  };

  const onSubmit = async values => {
    if (isEdit) {
      await updateOneStrategyMutation({
        variables: {
          id: +strategyId!,
          data: {
            name: values.name,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_STRATEGIES,
          },
        ],
      });
    } else {
      await addOneStrategyMutation({
        variables: {
          data: {
            name: values.name,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_STRATEGIES,
          },
        ],
      });
    }
    onClose();
    onOpenSave();
  };

  return (
    <ModalCreateEdit
      isOpen={true}
      onClose={onClose}
      isCentered={false}
      formProps={{
        onSubmit: onSubmit,
        validationSchema: validationSchema,
        defaultValues: defaultValues(),
      }}
      isLoadingModal={loading}
      isLoading={loadingAdd || loadingUpdate}
      modalTitle={`${data ? 'Edit' : 'Add'} Strategy`}
      modalBody={
        <div className="grid gap-10">
          <InputField name="name" label="Strategy Name" />
        </div>
      }
    />
  );
};

export default AddStrategyModal;
