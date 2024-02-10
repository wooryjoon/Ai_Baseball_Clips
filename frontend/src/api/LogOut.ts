import { instance } from '.';

const requestLogOut = () => {
    return instance.get(import.meta.env.VITE_API_LOGOUT_URL);
};
export default requestLogOut;
