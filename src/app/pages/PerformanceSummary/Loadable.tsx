/**
 * Asynchronously loads the component for PerformanceSummaryPage
 */

import { lazyLoad } from 'utils/loadable';

export const PerformanceSummaryPage = lazyLoad(
  () => import('./index'),
  module => module.PerformanceSummaryPage,
);
