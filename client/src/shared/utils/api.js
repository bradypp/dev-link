import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    timeout: 10000,
});

export default api;
