import { lazyLoad } from 'utils/loadable';

export const DashboardAdmin = lazyLoad(
  () => import('./index'),
  module => module.DashboardAdmin,
);
