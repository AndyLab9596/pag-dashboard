import { lazyLoad } from 'utils/loadable';

export const MySelfAssessment = lazyLoad(
  () => import('./index'),
  module => module.MySelfAssessment,
);
