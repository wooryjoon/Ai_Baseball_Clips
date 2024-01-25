import TextField from '@/components/TextField';
import './Login.scss';
import Button from '@/components/Button';
export default function LoginForm() {
    return (
        <div className="loginform-container">
            <h1>Login</h1>
            <TextField name="email" label="이메일" placeholder="이메일을 입력해주세요." />
            <TextField name="password" label="비밀번호" placeholder="비밀번호를 입력해주세요." />
            <button className="forgot-password">비밀번호를 잊어버리셨나요?</button>
            <Button styleType="login-form">로그인</Button>
            <div className="signup-navigate-message">
                계정이 없으신가요? <a>가입하기</a>
            </div>
        </div>
    );
}
