/**
 * Asynchronously loads the component for ListOfContributorsPage
 */

import { lazyLoad } from 'utils/loadable';

export const ListOfContributorsPage = lazyLoad(
  () => import('./index'),
  module => module.ListOfContributorsPage,
);
