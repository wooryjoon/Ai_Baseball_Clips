import { Axios } from 'axios';
import requestAccessToken from './requestAccessToken';

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
    // 403에러 가로챌 시 액세스 토큰 재발급 하고 원래 요청다시 하기!
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 403) {
                const accessToken = sessionStorage.getItem('accessToken');
                const refreshToken = sessionStorage.getItem('refreshToken');
                if (accessToken && refreshToken) {
                    requestAccessToken({ accessToken, refreshToken })
                        .then((response) => {
                            const newAccessToken = response.data.accessToken();
                            sessionStorage.addItem('accessToken', newAccessToken);
                            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                            return instance.request(error.config);
                        })
                        .catch(() => {});
                }
            }
        }
    );
}
