import { Box, Flex } from '@chakra-ui/react';
import { InputField } from 'app/components/ui/Form';
import { Label } from 'app/components/ui/Form/Label';
import RadioField, { OptionsProps } from 'app/components/ui/Form/RadioField';
import { TextAreaField } from 'app/components/ui/Form/TextAreaField';
import * as React from 'react';
import ReminderTemplateDropdown from './ReminderTemplateDropdown';
import { SendReminderFieldID as FieldName } from '../../types';
import { useFormContext } from 'react-hook-form';
import { Recipients, useGetUsersInReminderQuery, UserActionFilter } from 'app/generated/graphql';
import { defaultValues } from '../SendReminderModal';

export interface Props {
  userIds: number[];
  filter?: UserActionFilter;
}

export default function RecipientPanel(props: Props) {
  const { filter, userIds } = props;

  const { setValue, getValues } = useFormContext();

  const { data: recipientUsers, refetch: getRecipientUsers } = useGetUsersInReminderQuery({
    variables: {
      filter: filter ?? {
        isSelectAll: false,
        userIds,
      },
      recipient: defaultValues[FieldName.recipient],
    },
    fetchPolicy: 'network-only',
  });

  React.useEffect(() => {
    if (!recipientUsers) return;

    setValue(
      FieldName.reviewRecipient,
      recipientUsers.getUsersInReminder.map(user => user.name),
    );
  }, [recipientUsers]);

  const handleChangeReminderTitle = e => {
    setValue(FieldName.reviewReminderTitle, e.target.value);
  };

  const handleChangeReminderMessage = e => {
    setValue(FieldName.reviewReminderMessage, e.target.value);
  };

  const handleSelectRecipient = e => {
    switch (e.target.value) {
      case 'users':
        getRecipientUsers({
          recipient: Recipients.Users,
        });
        break;
      case 'evaluators':
        getRecipientUsers({
          recipient: Recipients.Evaluators,
        });
        break;
      case 'contributors':
        getRecipientUsers({
          recipient: Recipients.Contributors,
        });
        break;
      default:
        break;
    }
  };

  const handleSelectReminderMessage = e => {
    if (e.target.value === '1') {
      setValue(FieldName.reviewReminderTitle, '');
      setValue(FieldName.reviewReminderMessage, '');
    }
    if (e.target.value === '0') {
      setValue(FieldName.customReminderTitle, '');
      setValue(FieldName.customReminderMessage, '');

      let existingTemplateValues = getValues(FieldName.existingTemplate);
      setValue(FieldName.reviewReminderTitle, existingTemplateValues?.value?.subject);
      setValue(FieldName.reviewReminderMessage, existingTemplateValues?.value?.content);
    }
  };

  const recipientOptions: OptionsProps[] = [
    {
      name: 'Selected Users',
      value: 'users',
    },
    {
      name: 'Contributors for selected users(incomplete forms only)',
      value: 'contributors',
    },
    {
      name: 'Evaluators for selected users',
      value: 'evaluators',
    },
  ];

  const messageOptions: OptionsProps[] = [
    {
      name: 'Select from existing reminder message',
      value: '0',
      uncheckedShow: true,
      subOption: <ReminderTemplateDropdown />,
    },
    {
      name: 'Create a custom reminder message',
      value: '1',
      subOption: (
        <Box ml="24px">
          <InputField
            name={FieldName.customReminderTitle}
            onChange={handleChangeReminderTitle}
            label="Title"
            placeholder="Title here"
            mb="10px"
          />
          <Label label="Message" />
          <TextAreaField
            name={FieldName.customReminderMessage}
            onChange={handleChangeReminderMessage}
            placeholder="Message here"
            resize="vertical"
            fontSize="13px"
            pl="10px"
          />
        </Box>
      ),
    },
  ];

  return (
    <Flex>
      <RadioField
        w="50%"
        label="Select Recipient"
        name={FieldName.recipient}
        direction={'column'}
        options={recipientOptions}
        onChange={handleSelectRecipient}
      />
      <RadioField
        w="50%"
        label="Select Reminder Message"
        name={FieldName.reminderMessage}
        direction={'column'}
        options={messageOptions}
        onChange={handleSelectReminderMessage}
      />
    </Flex>
  );
}
