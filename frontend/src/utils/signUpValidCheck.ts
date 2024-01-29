const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
const emailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const passwordCheck = (password: string) => {
    return passwordRegEx.test(password);
};
const emailCheck = (email: string) => {
    return emailRegEx.test(email);
};
export { passwordCheck, emailCheck };
