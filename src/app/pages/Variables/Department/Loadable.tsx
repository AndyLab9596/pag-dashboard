/**
 * Asynchronously loads the component for VariablesPage
 */

import { lazyLoad } from 'utils/loadable';

export const DepartmentPage = lazyLoad(
  () => import('./index'),
  module => module.Department,
);
