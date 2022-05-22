/**
 * Asynchronously loads the component for CyclesPage
 */

import { lazyLoad } from 'utils/loadable';

export const ConfigurationsPage = lazyLoad(
  () => import('./index'),
  module => module.ConfigurationsPage,
);
