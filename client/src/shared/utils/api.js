import axios from 'axios';

const api = {
    instance: axios.create({
        baseURL: 'http://localhost:5000/api/v1',
        withCredentials: true,
        timeout: 10000,
    }),
};

export default api;
