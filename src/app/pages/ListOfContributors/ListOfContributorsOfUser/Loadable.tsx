/**
 * Asynchronously loads the component for ListOfContributorsOfUserPage
 */

import { lazyLoad } from 'utils/loadable';

export const ListOfContributorsOfUserPage = lazyLoad(
  () => import('./index'),
  module => module.ListOfContributorsOfUserPage,
);
