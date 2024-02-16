import { requestSignUp } from '@/api/SignUp';
import { FailResponse } from '@/api/type';
import { SignUpFormValues } from '@/pages/SignUp/type';
import { isAxiosError } from 'axios';
import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';

const useLogin = (userData: SignUpFormValues, navigate: NavigateFunction) => {
    requestSignUp(userData)
        .then(() => {
            navigate('/login');
        })
        .catch((error) => {
            if (isAxiosError<FailResponse>(error)) {
                alert(error.response?.data.message);
            }
        });
};

export default useLogin;
