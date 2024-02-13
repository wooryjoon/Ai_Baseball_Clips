import { instance } from '.';

const requestLogOut = async () => {
    return await instance.get(import.meta.env.VITE_API_LOGOUT_URL);
};
export default requestLogOut;
