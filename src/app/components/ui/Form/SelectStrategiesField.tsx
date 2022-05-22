import { FormField } from './FormField';
import StrategyDropdown from '../dashboard/StrategyDropdown';

export const SelectStrategiesField = ({ name, ...props }) => {
  return <FormField name={name} component={StrategyDropdown} {...props} />;
};
