/**
 * Asynchronously loads the component for UserContributorsPage
 */

import { lazyLoad } from 'utils/loadable';

export const UserContributorsPage = lazyLoad(
  () => import('./index'),
  module => module.UserContributorsPage,
);
