import { SignUpFormValues } from '@/pages/SignUp/type';
import { instance } from '.';
import { isAxiosError } from 'axios';
import { FailResponse } from './type';

const requestSignUp = async (userData: SignUpFormValues) => {
    try {
        await instance.post(import.meta.env.VITE_API_SIGNUP_URL, userData);
        alert('회원가입 완료');
    } catch (error) {
        if (isAxiosError<FailResponse>(error)) {
            alert(error.response?.data.message);
        }
    }
};

export { requestSignUp };
