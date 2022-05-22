import { LOCStatus } from 'common/contributors';
import type { ConfigContributorsPage } from './types';

const defaultConfig: ConfigContributorsPage = {
  LOCStatusAfterAddContributor: LOCStatus.IN_PROGRESS,
  isActionVisible: false,
  isSubmitVisible: false,
  sendReminder: false,
  handleDisableRow: (original: any) => false,
  closeCallback: () => {},
};

export default defaultConfig;
