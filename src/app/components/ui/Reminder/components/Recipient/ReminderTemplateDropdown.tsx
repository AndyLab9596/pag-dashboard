import { Box } from '@chakra-ui/react';
import { SelectField } from 'app/components/ui/Form';
import { useGetAllReminderTemplatesQuery } from 'app/generated/graphql';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { SendReminderFieldID as FieldName } from '../../types';
import useToastStatus from 'app/components/Toast/useToastHook';

export interface ReminderTemplateDropdownProps {}

const ReminderTemplateDropdown: React.FC<ReminderTemplateDropdownProps> = () => {
  const { setValue, getValues } = useFormContext();
  const toast = useToastStatus();

  const { loading, data } = useGetAllReminderTemplatesQuery({
    onCompleted: ({ getAllReminderTemplates: d }) => {
      if (d.length === 0 || !!getValues(FieldName.existingTemplate)?.label) return; //ignore if already set
      let selectedTemplate = d.filter(t => t.reminderMe)[0];
      setValue(FieldName.reviewReminderTitle, selectedTemplate.subject);
      setValue(FieldName.reviewReminderMessage, selectedTemplate.content);
      setValue(FieldName.existingTemplate, {
        value: { ...selectedTemplate },
        label: selectedTemplate.name,
      });
    },
    onError: error => {
      toast({
        status: 'error',
        title: error.message,
      });
    },
  });

  const templates = data?.getAllReminderTemplates || [];

  const onChange = values => {
    setValue(FieldName.reviewReminderTitle, values.value.subject);
    setValue(FieldName.reviewReminderMessage, values.value.content);
    setValue(FieldName.existingTemplate, values);
  };

  return (
    <Box mb="7.5px" ml="24px">
      <SelectField
        name={FieldName.existingTemplate}
        isMulti={false}
        options={templates && templates.filter(t => t.reminderMe).map(t => ({ value: { ...t }, label: t.name }))}
        isLoading={loading}
        onChange={onChange}
      />
    </Box>
  );
};

export default ReminderTemplateDropdown;
