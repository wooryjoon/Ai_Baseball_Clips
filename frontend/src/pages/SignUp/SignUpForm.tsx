import Button from '@/components/Button';
import TextField from '@/components/TextField';
import { ChangeEvent, useCallback, useState } from 'react';
import { SignUpFormValues } from './type';
import { passwordCheck } from '@/utils/signUpValidCheck';
import NavigateMessage from '@/components/NavigateMessage';
import { axiosInstance } from '@/api';
//TODO 버튼 클릭 시 axios.POST 요청
export default function SignUpForm() {
    const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormValues>({
        email: '',
        password: '',
    });
    const handleSignUpFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSignUpFormValues((prev: SignUpFormValues) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);

    // 버튼 클릭 시 signUpFormValues를 body에 담아 회원 가입 요청
    const requestSignUp = (userData: SignUpFormValues) => {
        axiosInstance
            .post('member/join', userData)
            .then
            // TODO 리덕스로 로그인 상태 관리
            ()
            .catch();
    };

    return (
        <div className="signupform-container">
            <h1>Create account</h1>

            <TextField
                name={'email'}
                label={'이메일'}
                placeholder={'이메일을 입력해주세요.'}
                onChange={handleSignUpFormValues}
                lengths={signUpFormValues.email.length}
            />
            <TextField
                name={'password'}
                hasError={
                    !passwordCheck(signUpFormValues.password) &&
                    signUpFormValues.password.length > 0
                }
                label={'비밀번호'}
                placeholder={'비밀번호를 입력해주세요.'}
                onChange={handleSignUpFormValues}
                lengths={signUpFormValues.password.length}
            />

            <Button
                styleType={'continue'}
                onClick={() => {
                    requestSignUp(signUpFormValues);
                }}
            >
                계속
            </Button>
            <NavigateMessage
                textMessage="이미 계정이 있으신가요?"
                linkMessage="로그인"
                type="login"
            />
        </div>
    );
}
