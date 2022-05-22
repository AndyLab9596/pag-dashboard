import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import useToastStatus from 'app/components/Toast/useToastHook';
import { InputField } from 'app/components/ui/Form';
import { CheckBoxField } from 'app/components/ui/Form/CheckBoxField';
import { EditorField } from 'app/components/ui/Form/EditorField';
import {
  useAddOneReminderTemplateMutation,
  useGetOneReminderTemplateQuery,
  useUpdateOneReminderTemplateMutation,
} from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { GET_ALL_REMINDER_TEMPLATE } from 'graphql/reminderTemplate';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { DataReminderModal } from '../types';

const validationSchema = yup.object().shape({
  name: yup.string().strict(false).trim().required('Description is required').min(2, 'Too Short!'),
  subject: yup.string().strict(false).trim().required('Reminder Subject is required').min(2, 'Too Short!'),
  key: yup.string().strict(false).trim().required('Key Filed is required').min(2, 'Too Short!'),
  content: yup.string().strict(false).trim().required('Reminder Content is required').min(2, 'Too Short!'),
  shortContent: yup.string().strict(false).trim().required('Notification Content is required').min(2, 'Too Short!'),
});
export interface ReminderModalProps {
  handleClose: () => void;
  currentPage?: number;
  handleOpenSave?: () => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ currentPage = 1, handleClose, handleOpenSave }) => {
  const navigate = useNavigate();
  const toast = useToastStatus();
  const { reminderId } = useParams<{ reminderId: string | undefined }>();

  const [updateOneReminderMutation, { loading: loadingUpdate }] = useUpdateOneReminderTemplateMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const [addOneReminderMutation, { loading: loadingAdd }] = useAddOneReminderTemplateMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const isEdit = Boolean(reminderId);

  const { loading, data } = useGetOneReminderTemplateQuery({
    skip: !reminderId,
    variables: {
      id: parseFloat(reminderId as string),
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
      const oneReminderTemplate: DataReminderModal = data?.getOneReminderTemplate as DataReminderModal;
      const { name, subject, content, key, shortContent, reminderMe } = oneReminderTemplate;
      return {
        name,
        subject,
        content,
        key,
        shortContent,
        reminderMe,
      };
    }
    return {
      name: '',
      subject: '',
      content: '',
      key: '',
      shortContent: '',
      reminderMe: false,
    };
  };

  const onSubmit = async values => {
    if (isEdit) {
      await updateOneReminderMutation({
        variables: {
          id: Number.parseInt(reminderId as string),
          data: {
            name: values.name,
            subject: values.subject,
            content: values.content,
            key: values.key,
            shortContent: values.shortContent,
            reminderMe: values.reminderMe,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_REMINDER_TEMPLATE,
          },
        ],
      });
      handleOpenSave && handleOpenSave();
    } else {
      await addOneReminderMutation({
        variables: {
          data: {
            name: values.name,
            subject: values.subject,
            content: values.content,
            key: values.key,
            shortContent: values.shortContent,
            reminderMe: values.reminderMe,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_REMINDER_TEMPLATE,
          },
        ],
      });
    }
    navigate(RoutesPath.REMINDERS);
  };
  return (
    <ModalCreateEdit
      width="600px"
      size={'3xl'}
      isOpen={true}
      onClose={handleClose}
      isCentered={false}
      formProps={{
        onSubmit: onSubmit,
        validationSchema: validationSchema,
        defaultValues: defaultValues(),
      }}
      isLoadingModal={loading}
      isLoading={loadingAdd || loadingUpdate}
      modalTitle={`${reminderId ? 'Edit' : 'New'} Reminder`}
      modalBody={
        <div className="grid gap-10">
          <InputField label="Description" name="name" placeholder="Notification to Users - ...." />
          <InputField label="Reminder Subject" name="subject" placeholder="Complete your list of contributors" />
          <InputField label="Key Filed" name="key" />
          <EditorField label="Reminder Content" name="content" />
          <CheckBoxField label="Include in Send Reminder List" checkboxAfterLabel name="reminderMe" />
          <InputField label="Notification Content" name="shortContent" />
        </div>
      }
    />
  );
};

export default ReminderModal;
