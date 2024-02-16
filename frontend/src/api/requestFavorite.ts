import { instance } from '.';

export const requestFavorite = async (data: { batId: number }) => {
    return await instance.post(import.meta.env.VITE_API_BASE_URL + `/favorite/updateStatus`, data);
};
