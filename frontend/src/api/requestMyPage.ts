import { instance } from '.';
import { FavoriteVideo, UserInfo } from './type';

const requestUserInfo = async () => {
    return await instance.get<UserInfo>(import.meta.env.VITE_API_BASE_URL + '/member/info');
};
const requestFavoriteVideoList = async () => {
    return await instance.get<FavoriteVideo[]>(
        import.meta.env.VITE_API_BASE_URL + '/favorite/list'
    );
};

export { requestFavoriteVideoList, requestUserInfo };
