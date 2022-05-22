import { RoutesPath } from 'app/routes/routesPath';

export const config = {
  API_URL: process.env.REACT_APP_API_URL || 'https://pag.dev2.hdwebsoft.co/graphql',
  REST_APP_API_URL: process.env.REACT_APP_REST_API_URL || 'https://pag.dev2.hdwebsoft.co/api',
  LOGIN_PATH: process.env.LOGIN_PATH || RoutesPath.LOGIN,
  DASHBOARD_PATH: process.env.DASHBOARD_PATH || RoutesPath.DASHBOARD,
  DATE_FORMAT: 'MMM DD, YYYY',
  DATE_TIME_FORMAT: 'MMM DD, YYYY h:mm A',
  STORE_ACCESS_TOKEN: 'access_token',
  STORE_ROLE: 'role',
  BASE_IMAGE_URL: process.env.REACT_APP_BASE_IMAGE_URL ?? '',
};

export default config;
