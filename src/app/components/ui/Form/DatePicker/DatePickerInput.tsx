import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import Input from '../Input';
import { Label } from '../Label';

interface DatePickerInputProps extends ReactDatePickerProps {
  label?: string;
  onChange: (date) => void;
}
export const DatePickerInput: React.FC<DatePickerInputProps> = props => {
  const { label, onChange, value } = props;
  const onChangeDate = date => {
    onChange && onChange(date);
  };
  return (
    <div>
      {label && <Label label={label} />}
      <DatePicker
        {...props}
        selected={value ? new Date(value) : undefined}
        onChange={onChangeDate}
        customInput={<Input />}
      />
    </div>
  );
};
