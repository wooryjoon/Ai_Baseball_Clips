const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

const passwordCheck = (password: string) => {
    return passwordRegEx.test(password);
};

export { passwordCheck };
