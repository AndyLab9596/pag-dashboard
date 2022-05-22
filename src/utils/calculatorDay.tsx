export default function calculatorDay(date: string): JSX.Element | string {
  let dateTo = new Date(date);
  let dateFrom = new Date();

  let time = dateTo.getTime() - dateFrom.getTime();

  let days = Math.ceil(time / (1000 * 3600 * 24));

  if (days > 0 && days !== 1) {
    return days + ' Days Left';
  }
  if (days === 1) {
    return days + ' Day Left';
  }
  if (days < 0 && days !== -1) {
    return <span style={{ color: 'red' }}>{days * -1 + ' Days Overdue '}</span>;
  }
  if (days === -1) {
    return <span style={{ color: 'red' }}>{days * -1 + ' Day Overdue '}</span>;
  }

  return <span style={{ color: 'red' }}>Overdue</span>;
}
