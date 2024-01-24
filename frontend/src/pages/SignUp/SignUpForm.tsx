import Button from '@/components/Button';
import TextField from '@/components/TextField';
import { ChangeEvent, useCallback, useState } from 'react';
import { SignUpFormValues } from './type';
import { passwordCheck } from '@/utils/signUpValidCheck';
import PasswordInfo from './PasswordInfo';

export default function SignUpForm() {
    //TODO 이메일 형식에 따라 hasError 상태 전환

    const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormValues>({
        email: '',
        password: '',
    });
    const handleSignUpFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSignUpFormValues((prev: SignUpFormValues) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const isValidPassword = passwordCheck(signUpFormValues.password);

    return (
        <div className="signupform-container">
            <h1>Create account</h1>

            <TextField
                name={'email'}
                label={'이메일'}
                placeholder={'이메일을 입력해주세요.'}
                onChange={handleSignUpFormValues}
            />
            <TextField
                name={'password'}
                hasError={!isValidPassword && signUpFormValues.password.length > 0}
                label={'비밀번호'}
                placeholder={'비밀번호를 입력해주세요.'}
                onChange={handleSignUpFormValues}
            />
            <PasswordInfo isCorrect={isValidPassword && signUpFormValues.password.length > 0} />

            <Button styleType={'continue'}>계속</Button>
            <div className="login-navigate-message">
                이미 계정이 있으신가요? <button>로그인</button>
            </div>
        </div>
    );
}
