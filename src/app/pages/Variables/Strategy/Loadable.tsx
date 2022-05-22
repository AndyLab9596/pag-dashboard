/**
 * Asynchronously loads the component for VariablesPage
 */

import { lazyLoad } from 'utils/loadable';

export const StrategyPage = lazyLoad(
  () => import('./index'),
  module => module.Strategy,
);
