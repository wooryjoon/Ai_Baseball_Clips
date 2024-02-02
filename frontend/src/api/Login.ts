import { LoginFormValues } from '@/pages/Login/type';
import { instance } from './index';
import { LoginResponseData, FailResponse } from './type';
import { AxiosResponse } from 'axios';
import { isAxiosError } from 'axios';
import addAxiosInterceptor from './interceptor.ts';
const requestLogin = async (userData: LoginFormValues) => {
    try {
        const response: AxiosResponse<LoginResponseData> = await instance.post<LoginResponseData>(
            import.meta.env.VITE_API_LOGIN_URL,
            userData
        );
        addAxiosInterceptor(instance);
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
        console.log('로그인 시도중');
    } catch (error) {
        if (isAxiosError<FailResponse>(error)) {
            alert(error.response?.data.message);
        }
    }
};

export { requestLogin };
