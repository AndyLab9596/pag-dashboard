import { DatePickerSelect } from './DatePicker';
import { FormField } from './FormField';

export const DatePickerField = ({ name, ...props }) => {
  return <FormField name={name} component={DatePickerSelect} {...props} />;
};
