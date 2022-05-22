import { ApolloQueryResult } from '@apollo/client';
import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import useToastStatus from 'app/components/Toast/useToastHook';
import { InputField } from 'app/components/ui/Form';
import { CheckBoxField } from 'app/components/ui/Form/CheckBoxField';
import { useAddOneCycleMutation, useGetOneCycleQuery, useUpdateOneCycleMutation } from 'app/generated/graphql';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { DataCycleModal } from '../types';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

export interface CycleModalProps {
  handleClose: () => void;
  refetch?: () => Promise<ApolloQueryResult<any>>;
  onOpenSave: () => void;
}

const CycleModal: React.FC<CycleModalProps> = ({ handleClose, refetch, onOpenSave }) => {
  const { cycleId } = useParams<{ cycleId: string | undefined }>();
  const toast = useToastStatus();
  const [addOneCycleMutation, { loading: loadingAdd }] = useAddOneCycleMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const [updateOneCycleMutation, { loading: loadingUpdate }] = useUpdateOneCycleMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const isEdit = Boolean(cycleId);

  const { loading, data } = useGetOneCycleQuery({
    skip: !cycleId,
    variables: {
      id: parseFloat(cycleId as string),
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
    if (isEdit && !loading) {
      const oneCycle: DataCycleModal = data?.getOneCycle as DataCycleModal;
      const { name, isActive } = oneCycle;
      return {
        name,
        isActive,
      };
    }
    return {
      name: '',
      isActive: false,
    };
  };

  const onSubmit = async values => {
    if (isEdit) {
      await updateOneCycleMutation({
        variables: {
          id: Number.parseFloat(cycleId as string),
          data: {
            name: values.name,
          },
        },
      });
      if (typeof refetch === 'function') refetch();
    } else {
      await addOneCycleMutation({
        variables: {
          data: {
            name: values.name,
          },
        },
      });
      if (typeof refetch === 'function') refetch();
    }
    handleClose();
    onOpenSave();
  };

  return (
    <ModalCreateEdit
      isOpen={true}
      width="350px"
      onClose={handleClose}
      formProps={{
        onSubmit: onSubmit,
        validationSchema: validationSchema,
        defaultValues: defaultValues(),
      }}
      isLoadingModal={loading}
      isLoading={loadingAdd || loadingUpdate}
      modalTitle={`${cycleId ? 'Edit' : 'New'} Cycle`}
      modalBody={
        <React.Fragment>
          <InputField name="name" label="Cycle Name" />
          <CheckBoxField name="isActive" sx={{ display: 'none' }} />
        </React.Fragment>
      }
    />
  );
};

export default CycleModal;
