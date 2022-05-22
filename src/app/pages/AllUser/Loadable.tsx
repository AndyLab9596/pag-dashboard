/**
 * Asynchronously loads the component for AllUserPage
 */

import { lazyLoad } from 'utils/loadable';

export const AllUserPage = lazyLoad(
  () => import('./index'),
  module => module.AllUserPage,
);
