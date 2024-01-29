import Button from '@/components/Button';
import TextField from '@/components/TextField';
import { ChangeEvent, useCallback, useState } from 'react';
import { SignUpFormValues } from './type';
import { passwordCheck } from '@/utils/signUpValidCheck';
import NavigateMessage from '@/components/NavigateMessage';

import useSignUpInput from '@/hooks/useSignUpInput';
import requestSignUp from '@/api/requestSignUp';
//TODO 버튼 클릭 시 axios.POST요청
export default function SignUpForm() {
    //TODO PasswordInfo 컴포넌트 삭제 후, 에러 메시지 조정 (스타일 상 더 나아보임)
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
                lengths={signUpFormValues.email.length}
            />
            <TextField
                name={'password'}
                hasError={!isValidPassword && signUpFormValues.password.length > 0}
                label={'비밀번호'}
                placeholder={'비밀번호를 입력해주세요.'}
                onChange={handleSignUpFormValues}
                lengths={signUpFormValues.password.length}
            />

            <Button styleType={'continue'}>계속</Button>
            <NavigateMessage textMessage="이미 계정이 있으신가요?" linkMessage="로그인" />
        </div>
    );
}
