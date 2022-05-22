import { Department } from 'app/generated/graphql';
import { LOCStatus } from 'common/contributors';
import { CARD_TYPE } from '../types';

export const calculatorDay = date => {
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
};

export const renderDay = (params: {
  departmentInfo?: Omit<Department, 'createdAt' | 'updatedAt'> | null;
  cardType: CARD_TYPE;
  status?: string;
  isComplete?: boolean;
  optOut?: boolean;
}) => {
  let { departmentInfo, cardType, status, isComplete, optOut } = params;

  if (!departmentInfo) {
    return false;
  }

  switch (cardType) {
    case CARD_TYPE.CONTRIBUTORS:
      if (status === LOCStatus.SUBMITTED) {
        return calculatorDay(departmentInfo.deadlineConfirmLOC);
      }
      if (status === LOCStatus.APPROVED) {
        return false;
      }
      return calculatorDay(departmentInfo.deadlineLOC);
    case CARD_TYPE.SUMMARIES:
    case CARD_TYPE.EVALUATIONS:
      if (isComplete || optOut) {
        return false;
      }
      return calculatorDay(departmentInfo.deadlinePerformanceEvaluation);
    case CARD_TYPE.ASSESSMENT:
      if (isComplete) {
        return false;
      }
      return calculatorDay(departmentInfo.deadlineSelfAssessment);
    default:
      return false;
  }
};
