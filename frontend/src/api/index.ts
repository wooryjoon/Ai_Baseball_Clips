import axios from 'axios';
import { Axios } from 'axios';
import addAxiosInterceptor from './interceptor';
const instance: Axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // withCredentials: true,
});

addAxiosInterceptor(instance);

export { instance };
