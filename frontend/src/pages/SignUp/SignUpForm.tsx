import Button from '@/components/Button';
import TextField from '@/components/TextField';
import { emailCheck, passwordCheck } from '@/utils/signUpValidCheck';
import NavigateMessage from '@/components/NavigateMessage';

import useSignUpInput from '@/hooks/useSignUpInput';
import requestSignUp from '@/api/requestSignUp';
//TODO 버튼 클릭 시 axios.POST 요청
export default function SignUpForm() {
    const { signUpFormValues, handleSignUpFormValues } = useSignUpInput({
        email: '',
        password: '',
    });

    return (
        <div className="signupform-container">
            <h1>Create account</h1>

            <TextField
                name={'email'}
                label={'이메일'}
                placeholder={'이메일을 입력해주세요.'}
                onChange={handleSignUpFormValues}
                length={signUpFormValues.email.length}
                hasError={!emailCheck(signUpFormValues.email)}
            />
            <TextField
                name={'password'}
                hasError={!passwordCheck(signUpFormValues.password)}
                label={'비밀번호'}
                placeholder={'비밀번호를 입력해주세요.'}
                onChange={handleSignUpFormValues}
                length={signUpFormValues.password.length}
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
