/**
 * Asynchronously loads the component for CyclesPage
 */

import { lazyLoad } from 'utils/loadable';

export const CyclesPage = lazyLoad(
  () => import('./index'),
  module => module.CyclesPage,
);
