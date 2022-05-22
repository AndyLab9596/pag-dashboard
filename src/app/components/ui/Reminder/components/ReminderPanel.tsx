import { Box } from '@chakra-ui/react';
import { CalendarField } from 'app/components/ui/Form/CalendarField';
import RadioField from 'app/components/ui/Form/RadioField';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { SendReminderFieldID as FieldName } from '../types';
import dayjs from 'dayjs';

export interface ReminderPanelProps {}

const ReminderPanel: React.FC<ReminderPanelProps> = () => {
  const { setValue } = useFormContext();

  const handleChangeReminderSchedule = e => {
    setValue(FieldName.reviewSchedule, 'Immediately');
  };

  const handleSelectDate = value => {
    let date = new Date(value);
    setValue(FieldName.reviewSchedule, dayjs(date).format('YYYY-MM-DD'));
    setValue(FieldName.reminderScheduleDate, value);
  };

  const reminderOptions = [
    {
      name: 'Send Immediately',
      value: '0',
    },
    {
      name: 'Schedule for a future date',
      value: '1',
      subOption: (
        <Box ml="24px">
          <CalendarField
            onChange={handleSelectDate}
            name={FieldName.reminderScheduleDate}
            locale="en"
            minDate={new Date()}
          />
        </Box>
      ),
    },
  ];
  return (
    <div>
      <RadioField
        name={FieldName.reminderSchedule}
        onChange={handleChangeReminderSchedule}
        label="Select Reminder"
        direction="row"
        options={reminderOptions}
      />
    </div>
  );
};

export default ReminderPanel;
