import Select from './Select';
import { FormField } from './FormField';

export const SelectField = ({ name, isMulti, ...props }) => {
  return <FormField name={name} isMulti={isMulti} component={Select} {...props} />;
};
