import { requestEmailCheck } from '@/api/SignUp';
import { SignUpFormValues } from '@/pages/SignUp/type';

const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

const emailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const passwordCheck = (password: string) => {
    return passwordRegEx.test(password);
};
const emailCheck = (email: string) => {
    return emailRegEx.test(email);
};
const isValidUserInfo = (signUpFormValues: SignUpFormValues) => {
    const isValid = emailCheck(signUpFormValues.email) && passwordCheck(signUpFormValues.password);
    return isValid;
};

const onClickEmailCheckHandler = (userData: SignUpFormValues) => {
    requestEmailCheck(userData.email);
};
export { passwordCheck, emailCheck, isValidUserInfo, onClickEmailCheckHandler };
