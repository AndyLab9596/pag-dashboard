/**
 * Asynchronously loads the component for TechSupportPage
 */

import { lazyLoad } from 'utils/loadable';

export const TechSupportPage = lazyLoad(
  () => import('./index'),
  module => module.TechSupportPage,
);
