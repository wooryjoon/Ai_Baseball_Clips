import { SignUpFormValues } from '@/pages/SignUp/type';
import { axiosInstance } from '.';

const requestSignUp = (userData: SignUpFormValues) => {
    console.log(userData);
    axiosInstance
        .post('member/join', userData)
        .then
        // TODO 리덕스로 로그인 상태 관리
        ()
        .catch();
};

export default requestSignUp;
