/**
 * Asynchronously loads the component for OverallPerformanceSummaryPage
 */

import { lazyLoad } from 'utils/loadable';

export const OverallPerformanceSummaryPage = lazyLoad(
  () => import('./index'),
  module => module.OverallPerformanceSummaryPage,
);
