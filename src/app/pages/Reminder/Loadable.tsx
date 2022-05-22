/**
 * Asynchronously loads the component for RemindersPage
 */

import { lazyLoad } from 'utils/loadable';

export const RemindersPage = lazyLoad(
  () => import('./index'),
  module => module.RemindersPage,
);
