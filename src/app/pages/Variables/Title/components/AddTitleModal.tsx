import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import useToastStatus from 'app/components/Toast/useToastHook';
import { InputField } from 'app/components/ui/Form';
import { CheckBoxField } from 'app/components/ui/Form/CheckBoxField';
import { useAddOneTitleMutation, useGetOneTitleQuery, useUpdateOneTitleMutation } from 'app/generated/graphql';
import { GET_ALL_TITLES } from 'graphql/title';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { VariablesContext } from '../../index';

const validationSchema = yup.object().shape({
  name: yup.string().strict(false).trim().required('Title is required'),
});

interface AddTitleModalProps {
  onClose: () => void;
  currentPage?: number;
}

const AddTitleModal: React.FC<AddTitleModalProps> = ({ currentPage = 1, onClose }) => {
  const toast = useToastStatus();
  const { titleId } = useParams<{ titleId: string | undefined }>();
  const [addOneTitleMutation, { loading: loadingAdd }] = useAddOneTitleMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [updateOneTitleMutation, { loading: loadingUpdate }] = useUpdateOneTitleMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const { onOpenSave } = useContext(VariablesContext);
  const isEdit = Boolean(titleId);

  const { loading, data } = useGetOneTitleQuery({
    skip: !titleId,
    variables: {
      id: parseFloat(titleId as string),
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
        name: data?.getOneTitle.name,
        isMDOrAbove: data?.getOneTitle.isMDOrAbove,
      };
    }
    return {
      name: '',
      isMDOrAbove: false,
    };
  };

  const onSubmit = async values => {
    if (isEdit) {
      await updateOneTitleMutation({
        variables: {
          id: +titleId!,
          data: {
            name: values.name,
            isMDOrAbove: values.isMDOrAbove,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_TITLES,
          },
        ],
      });
    } else {
      await addOneTitleMutation({
        variables: {
          data: {
            name: values.name,
            isMDOrAbove: values.isMDOrAbove,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_TITLES,
          },
        ],
      });
    }
    onClose();
    onOpenSave();
  };

  return (
    <>
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
        modalTitle={`${data ? 'Edit' : 'Add'} Title`}
        modalBody={
          <div className="grid gap-10">
            <InputField name="name" label="Title" />
            <CheckBoxField label="isMD?" checkboxAfterLabel name="isMDOrAbove" />
          </div>
        }
      />
    </>
  );
};

export default AddTitleModal;
