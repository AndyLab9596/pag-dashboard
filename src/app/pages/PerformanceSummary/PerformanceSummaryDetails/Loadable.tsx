/**
 * Asynchronously loads the component for PerformanceSummaryDetailsPage
 */

import { lazyLoad } from 'utils/loadable';

export const PerformanceSummaryDetailsPage = lazyLoad(
  () => import('./index'),
  module => module.PerformanceSummaryDetailsPage,
);
