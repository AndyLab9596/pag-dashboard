import { lazyLoad } from 'utils/loadable';

export const OpenEvaluationPage = lazyLoad(
  () => import('./index'),
  module => module.OpenEvaluationPage,
);
