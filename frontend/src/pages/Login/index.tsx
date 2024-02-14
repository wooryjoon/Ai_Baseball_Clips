import { memo } from 'react';
import LoginForm from './LoginForm';

function Login() {
    return (
        <div className="login-container">
            <LoginForm />
        </div>
    );
}
export default memo(Login);
