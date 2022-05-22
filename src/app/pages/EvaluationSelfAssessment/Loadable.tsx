/**
 * Asynchronously loads the component for RemindersPage
 */

import { lazyLoad } from 'utils/loadable';

export const EvaluationSelfAssessmentPage = lazyLoad(
  () => import('./index'),
  module => module.EvaluationSelfAssessmentPage,
);
