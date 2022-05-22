import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerSelect = props => {
  const onChangeDate = date => {
    props.onChange && props.onChange(date);
  };
  return (
    <DatePicker autoComplete="off" dateFormat="yyyy-MM-dd" className="text-center" onChange={onChangeDate} {...props} />
  );
};
