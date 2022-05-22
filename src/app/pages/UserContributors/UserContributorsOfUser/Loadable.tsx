/**
 * Asynchronously loads the component for UserContributorsOfUserPage
 */

import { lazyLoad } from 'utils/loadable';

export const UserContributorsOfUserPage = lazyLoad(
  () => import('./index'),
  module => module.UserContributorsOfUserPage,
);
