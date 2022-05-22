import { lazyLoad } from 'utils/loadable';

export const EvaluationView = lazyLoad(
  () => import('./index'),
  module => module.EvaluationViewPage,
);
