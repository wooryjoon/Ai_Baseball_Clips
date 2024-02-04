import { useSelector } from 'react-redux';

export const useAuthCheck = (): boolean => {
    //TODO - 리덕스에서 값을 꺼내와서 올바른 값인지 확인

    const loginState = useSelector((state: any) => state.auth.isAuth);
    return loginState;
};
