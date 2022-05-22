/**
 * Asynchronously loads the component for ListOfContributorsOfUserEditPage
 */

import { lazyLoad } from 'utils/loadable';

export const ListOfContributorsOfUserEditPage = lazyLoad(
  () => import('./index'),
  module => module.ListOfContributorsOfUserEditPage,
);
