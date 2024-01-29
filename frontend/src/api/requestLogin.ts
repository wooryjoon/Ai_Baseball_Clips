import { LoginFormValues } from '@/pages/Login/type';
import { axiosInstance } from './index';

const requestLogin = (userData: LoginFormValues) => {
    console.log(userData);
    axiosInstance
        .post('member/login', userData)
        .then
        // TODO 리덕스로 로그인 상태 관리
        ()
        .catch();
};

export default requestLogin;
