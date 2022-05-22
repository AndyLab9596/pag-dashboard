import { Grid, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import StepsModal from 'app/components/Modal/StepsModal';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import { Recipients, ReminderTemplate, useInvokeNotificationMutation, UserActionFilter } from 'app/generated/graphql';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { SendReminderFieldID as FieldName } from '../types';
import RecipientPanel from './Recipient/RecipientPanel';
import ReminderPanel from './ReminderPanel';
import ReviewPanel from './ReviewPanel';

const buttonStyles = {
  p: '0',
  w: '100%',
  _focus: {
    boxShadow: 'none',
  },
};

const validationSchema = yup.object().shape({
  [FieldName.reminderMessage]: yup.mixed().test('is-required', 'Required', (value, ctx) => {
    if (value === '0') {
      let selectedTemplate = ctx.parent[FieldName.existingTemplate];
      return !!selectedTemplate;
    }

    if (value === '1') {
      let title = ctx.parent[FieldName.customReminderTitle];
      let message = ctx.parent[FieldName.customReminderMessage];
      return !!title && !!message;
    }

    return true;
  }),
});

export interface SendReminderModalProps {
  selectedUserIds?: number[];
  isSelectAll?: boolean;
  onClose?: () => void;
  filter?: UserActionFilter;
}

interface FormValues {
  [FieldName.recipient]: Recipients;
  [FieldName.reminderMessage]: string;
  [FieldName.reminderSchedule]: string;
  [FieldName.existingTemplate]: {
    label: string;
    value: ReminderTemplate;
  } | null;
  [FieldName.customReminderTitle]: string;
  [FieldName.customReminderMessage]: string;
  [FieldName.reminderScheduleDate]: Date | null;
  [FieldName.reviewSchedule]: string;
  [FieldName.reviewRecipient]: string[];
  [FieldName.reviewReminderTitle]: string;
  [FieldName.reviewReminderMessage]: string;
}

export const defaultValues: FormValues = {
  [FieldName.recipient]: Recipients.Users,
  [FieldName.reminderMessage]: '0',
  [FieldName.reminderSchedule]: '0',
  [FieldName.existingTemplate]: null,
  [FieldName.customReminderTitle]: '',
  [FieldName.customReminderMessage]: '',
  [FieldName.reminderScheduleDate]: null,
  [FieldName.reviewSchedule]: 'Immediately',
  [FieldName.reviewRecipient]: [],
  [FieldName.reviewReminderTitle]: '',
  [FieldName.reviewReminderMessage]: '',
};

const SendReminderModal: React.FC<SendReminderModalProps> = ({
  selectedUserIds = [],
  isSelectAll = false,
  onClose,
  filter,
}) => {
  const navigate = useNavigate();

  const toast = useToastStatus();

  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const { userId } = useParams<{ userId: string | undefined }>();
  let userIds: number[] = selectedUserIds.concat(userId !== undefined ? [parseInt(userId)] : []);

  const [sendReminder, { loading }] = useInvokeNotificationMutation({
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      handleClose();
    },
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    navigate(-1);
  };

  const handleSubmit = (values: FormValues) => {
    let templateKey = values?.existingTemplate?.value?.key;

    if (values.reminderMessage === '1' || !templateKey) {
      templateKey = 'generic';
    }

    const data = {
      recipient: values.recipient,
      templateOptions: templateKey,
      subject: values.reviewReminderTitle,
      content: values.reviewReminderMessage,
      sendAt: values.reminderSchedule === '0' ? undefined : values.reviewSchedule,
    };

    sendReminder({
      variables: {
        data,
        filter: {
          ...(() => {
            // this query dont need cycleId
            const { cycleId, ...rest } = filter ?? {};
            return rest;
          })(),
          userIds,
          isSelectAll,
        },
      },
    })
      .then(() => {
        toast({ status: 'success', title: 'Send reminder successfully!' });
      })
      .catch(error => {
        toast({ status: 'error', title: 'Failed to send reminder!' });
      });
  };

  const handleBack = () => {
    setSelectedTab((selectedTab + 3 - 1) % 3);
  };

  const handleNext = () => {
    setSelectedTab((selectedTab + 1) % 3);
  };

  return (
    <StepsModal
      modalTitle="Send Reminder"
      isOpen={true}
      size="4xl"
      tabIndex={selectedTab}
      totalTab={3}
      formProps={{
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
        defaultValues,
      }}
      onBack={handleBack}
      onNext={handleNext}
      onClose={handleClose}
      isLoading={loading}
      modalBody={
        <Tabs index={selectedTab} variant="unstyled" minHeight="420px" maxHeight="420px">
          <TabList>
            <Grid templateColumns="repeat(3, 1fr)" gap={3} w="100%">
              <Button
                sx={buttonStyles}
                variant="solid"
                bg={selectedTab === 0 ? '#0067ac' : undefined}
                onClick={() => setSelectedTab(0)}
              >
                Step 1
              </Button>
              <Button
                sx={buttonStyles}
                variant="solid"
                bg={selectedTab === 1 ? '#0067ac' : undefined}
                onClick={() => setSelectedTab(1)}
              >
                Step 2
              </Button>
              <Button
                sx={buttonStyles}
                variant="solid"
                bg={selectedTab === 2 ? '#0067ac' : undefined}
                onClick={() => setSelectedTab(2)}
              >
                Step 3
              </Button>
            </Grid>
          </TabList>
          <TabPanels>
            <TabPanel px="0">
              <RecipientPanel filter={filter} userIds={userIds} />
            </TabPanel>
            <TabPanel px="0">
              <ReminderPanel />
            </TabPanel>
            <TabPanel px="0">
              <ReviewPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      }
    />
  );
};

export default SendReminderModal;
