import { instance } from '.';
import { TeamInfoFilteredByInnings } from './type';

const requestPlayerHighLight = async (reqId: number) => {
    return await instance.get<TeamInfoFilteredByInnings>(
        import.meta.env.VITE_API_BASE_URL + `/${reqId}/hitters/list/processed-videos`
    );
};

export { requestPlayerHighLight };
