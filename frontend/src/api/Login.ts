import { LoginFormValues } from '@/pages/Login/type';
import { instance } from './index';
import { LoginResponseData } from './type';

const requestLogin = async (userData: LoginFormValues) => {
    return await instance.post<LoginResponseData>(import.meta.env.VITE_API_LOGIN_URL, userData);
};

export { requestLogin };
