import { lazyLoad } from 'utils/loadable';

export const DashboardEvaluation = lazyLoad(
  () => import('./index'),
  module => module.DashboardEvaluation,
);
