import { instance } from '.';
interface TokenData {
    accessToken: string;
    refreshToken: string;
}
const requestAccessToken = async (tokenData: TokenData) => {
    return await instance.post(import.meta.env.VITE_API_REFRESH, tokenData);
};

export default requestAccessToken;
