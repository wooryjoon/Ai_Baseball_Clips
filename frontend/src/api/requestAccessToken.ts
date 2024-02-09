import { instance } from '.';
interface TokenData {
    accessToken: string;
    refreshToken: string;
}
const requestAccessToken = (tokenData: TokenData) => {
    return instance.post(import.meta.env.VITE_API_REFRESH, tokenData);
};

export default requestAccessToken;
