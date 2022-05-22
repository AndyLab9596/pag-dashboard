/**
 * Asynchronously loads the component for EvaluationTypeAddPage
 */

import { lazyLoad } from 'utils/loadable';

export const EvaluationAdd = lazyLoad(
  () => import('./index'),
  module => module.EvaluationTypeAddPage,
);
