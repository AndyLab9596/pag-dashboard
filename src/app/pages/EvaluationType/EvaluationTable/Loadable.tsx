/**
 * Asynchronously loads the component for EvaluationTypePage
 */

import { lazyLoad } from 'utils/loadable';

export const EvaluationTable = lazyLoad(
  () => import('./index'),
  module => module.EvaluationTypeTable,
);
