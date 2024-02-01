import axios from 'axios';
import { Axios } from 'axios';
const instance: Axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // withCredentials: true,
});

export { instance };
