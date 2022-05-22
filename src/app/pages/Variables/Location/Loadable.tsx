/**
 * Asynchronously loads the component for VariablesPage
 */

import { lazyLoad } from 'utils/loadable';

export const LocationPage = lazyLoad(
  () => import('./index'),
  module => module.Location,
);
