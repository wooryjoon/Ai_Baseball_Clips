import { SignUpFormValues } from '@/pages/SignUp/type';
import { instance } from '.';
import { isAxiosError } from 'axios';
import { FailResponse } from './type';

const requestSignUp = async (userData: SignUpFormValues) => {
    return await instance.post(import.meta.env.VITE_API_SIGNUP_URL, userData);
};
const requestEmailCheck = async (email: string) => {
    try {
        await instance.get(import.meta.env.VITE_API_EMAIL_CHECK_URL + '/' + email);
        alert('올바른 이메일입니다.');
    } catch (error) {
        if (isAxiosError<FailResponse>(error)) {
            alert(error.response?.data.message);
        }
    }
};

export { requestSignUp, requestEmailCheck };
