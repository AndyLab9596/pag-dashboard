/**
 * Asynchronously loads the component for EvaluationTypePage
 */

import { lazyLoad } from 'utils/loadable';

export const EvaluationTypePage = lazyLoad(
  () => import('./index'),
  module => module.EvaluationTypePage,
);
