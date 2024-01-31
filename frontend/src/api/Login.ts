import { LoginFormValues } from '@/pages/Login/type';
import { instance } from './index';
import { LoginResponseData, FailResponse } from './type';
import { Axios, AxiosResponse } from 'axios';
import { isAxiosError } from 'axios';

const requestLogin = async (userData: LoginFormValues) => {
    try {
        const response: AxiosResponse<LoginResponseData> = await instance.post<LoginResponseData>(
            import.meta.env.VITE_API_LOGIN_URL,
            userData
        );
        // axiosInterceptor 추가
        addAxiosInterceptor(instance);
        // 로컬 스토리지에 accessToken, refreshToken 저장
        sessionStorage.setItem('jwtToken', response.data.accessToken);
        sessionStorage.setItem('jwtToken', response.data.refreshToken);
    } catch (error) {
        //자바스크립트에서는 어떤 값이든 에러로 throw 할 수 있기 때문에 catch를 통해 전달받는 Error 객체는 기본적으로 unknown 타입이다.
        //이를 axiosError 로 좁힌다.
        if (isAxiosError<FailResponse>(error)) {
            alert(error.response?.data.message);
        }
    }
};

function addAxiosInterceptor(instance: Axios) {
    instance.interceptors.request.use(
        (config) => {
            const jwtToken = sessionStorage.getItem('jwtToken');

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

export { requestLogin };
