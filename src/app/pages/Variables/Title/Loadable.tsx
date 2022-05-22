/**
 * Asynchronously loads the component for VariablesPage
 */

import { lazyLoad } from 'utils/loadable';

export const TitlePage = lazyLoad(
  () => import('./index'),
  module => module.Title,
);
