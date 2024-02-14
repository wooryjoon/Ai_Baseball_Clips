import { memo } from 'react';
import './SignUp.scss';
import SignUpForm from './SignUpForm';

function SignUp() {
    return (
        <div className="signup-container">
            <SignUpForm />
        </div>
    );
}
export default memo(SignUp);
