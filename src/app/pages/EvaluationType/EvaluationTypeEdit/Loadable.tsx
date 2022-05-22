/**
 * Asynchronously loads the component for EvaluationTypeAddPage
 */

import { lazyLoad } from 'utils/loadable';

export const EvaluationEdit = lazyLoad(
  () => import('./index'),
  module => module.EvaluationTypeEdit,
);
