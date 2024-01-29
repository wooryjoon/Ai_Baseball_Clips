import { SignUpFormValues } from '@/pages/SignUp/type';
import { ChangeEvent, useCallback, useState } from 'react';

export default function useSignUpInput(signupInfo: SignUpFormValues) {
    const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormValues>(signupInfo);

    const handleSignUpFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSignUpFormValues((prev: SignUpFormValues) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    return { signUpFormValues, handleSignUpFormValues };
}
