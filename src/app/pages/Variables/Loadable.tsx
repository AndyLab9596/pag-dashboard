/**
 * Asynchronously loads the component for VariablesPage
 */

import { lazyLoad } from 'utils/loadable';

export const VariablesPage = lazyLoad(
  () => import('./index'),
  module => module.VariablesPage,
);
