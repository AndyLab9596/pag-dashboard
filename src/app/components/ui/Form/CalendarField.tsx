import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { FormField } from './FormField';

export const CalendarField = ({ name, ...props }) => {
  return <FormField name={name} component={Calendar} {...props} />;
};
