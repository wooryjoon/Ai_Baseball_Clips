import { instance } from '.';

export const requestFavorite = (data: { batId: number }) => {
    return instance.post(import.meta.env.VITE_API_BASE_URL + `/favorite/updateStatus`, data);
};
