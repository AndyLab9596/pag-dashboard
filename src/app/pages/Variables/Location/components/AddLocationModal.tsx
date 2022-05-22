import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import useToastStatus from 'app/components/Toast/useToastHook';
import { InputField } from 'app/components/ui/Form';
import { useAddOneLocationMutation, useGetOneLocationQuery, useUpdateOneLocationMutation } from 'app/generated/graphql';
import { GET_ALL_LOCATIONS } from 'graphql/location';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { VariablesContext } from '../..';
const validationSchema = yup.object().shape({
  name: yup.string().strict(false).trim().required('City is required'),
  countryCode: yup.string().strict(false).trim().required('Country is required'),
});

interface AddLocationModalProps {
  onClose: () => void;
  currentPage?: number;
}

const AddLocationModal: React.FC<AddLocationModalProps> = ({ currentPage = 1, onClose }) => {
  const toast = useToastStatus();
  const { onOpenSave } = useContext(VariablesContext);
  const { locationId } = useParams<{ locationId: string | undefined }>();
  const [addOneLocationMutation, { loading: loadingAdd }] = useAddOneLocationMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [updateOneLocationMutation, { loading: loadingUpdate }] = useUpdateOneLocationMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const isEdit = Boolean(locationId);
  const { loading, data } = useGetOneLocationQuery({
    skip: !locationId,
    variables: {
      id: parseFloat(locationId as string),
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
        name: data?.getOneLocation.name,
        countryCode: data?.getOneLocation.countryCode,
      };
    }
    return {
      name: '',
      countryCode: '',
    };
  };

  const onSubmit = async values => {
    if (isEdit) {
      await updateOneLocationMutation({
        variables: {
          id: +locationId!,
          data: {
            name: values.name,
            countryCode: values.countryCode,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_LOCATIONS,
          },
        ],
      });
    } else {
      await addOneLocationMutation({
        variables: {
          data: {
            name: values.name,
            countryCode: values.countryCode,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_LOCATIONS,
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
      modalTitle={`${data ? 'Edit' : 'Add'} Location`}
      modalBody={
        <div className="grid gap-10">
          <InputField name="name" label="City" />
          <InputField name="countryCode" label="Country" />
        </div>
      }
    />
  );
};

export default AddLocationModal;
