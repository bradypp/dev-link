import axios from 'axios';
import { urls } from 'shared/constants';

const api = axios.create({
    baseURL: `${urls.server}/api/v1`,
    withCredentials: true,
    timeout: 10000,
});

export default api;
