import { Axios } from 'axios';

export default function addAxiosInterceptor(instance: Axios) {
    instance.interceptors.request.use(
        (config) => {
            const jwtToken = sessionStorage.getItem('accessToken');

            // 토큰이 존재한다면 헤더에 추가
            if (jwtToken) {
                config.headers.Authorization = `Bearer ${jwtToken}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}
