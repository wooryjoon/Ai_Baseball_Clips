import { LoginFormValues } from '@/pages/Login/type';
import { instance } from './index';
import { LoginResponseData, FailResponse } from './type';
import { AxiosResponse } from 'axios';
import { isAxiosError } from 'axios';
import addAxiosInterceptor from './interceptor';
const requestLogin = async (userData: LoginFormValues) => {
    try {
        const response: AxiosResponse<LoginResponseData> = await instance.post<LoginResponseData>(
            import.meta.env.VITE_API_LOGIN_URL,
            userData
        );
        // accesstoken을 매 요청하다 header에 추가하는 axiosInterceptor 추가
        addAxiosInterceptor(instance);
        // 로컬 스토리지에 accessToken, refreshToken 저장
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
    } catch (error) {
        //자바스크립트에서는 어떤 값이든 에러로 throw 할 수 있기 때문에 catch를 통해 전달받는 Error 객체는 기본적으로 unknown 타입이다.
        //이를 axiosError 로 좁힌다.
        if (isAxiosError<FailResponse>(error)) {
            alert(error.response?.data.message);
        }
    }
};

export { requestLogin };
