import React from 'react';
import { DatePickerInput } from './DatePicker/DatePickerInput';
import { FormField } from './FormField';

interface DatePickerInputFieldProps {
  name: string;
  label?: string;
  onChange?: (date) => void;
  dateFormat?: string;
}

export const DatePickerInputField: React.FC<DatePickerInputFieldProps> = ({
  dateFormat = 'yyyy-MM-dd',
  name,
  ...props
}) => {
  return <FormField dateFormat={dateFormat} name={name} component={DatePickerInput} {...props} />;
};
