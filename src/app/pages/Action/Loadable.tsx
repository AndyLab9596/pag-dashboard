/**
 * Asynchronously loads the component for ActionPage
 */

import { lazyLoad } from 'utils/loadable';

export const ActionPage = lazyLoad(
  () => import('./index'),
  module => module.ActionPage,
);
