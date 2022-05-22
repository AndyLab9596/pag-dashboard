import axios from 'axios';
import { config } from 'config';
// import config from './c'

const baseURL = config.REST_APP_API_URL;

let token;
if (typeof window !== 'undefined') {
  token = window.localStorage.getItem(config.STORE_ACCESS_TOKEN);
}

const axiosClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosClient;
