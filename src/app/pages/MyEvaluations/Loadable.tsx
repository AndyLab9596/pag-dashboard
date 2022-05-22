import { lazyLoad } from 'utils/loadable';

export const MyEvaluationsPage = lazyLoad(
  () => import('./index'),
  module => module.MyEvaluationsPage,
);
