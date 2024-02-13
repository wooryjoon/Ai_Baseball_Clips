import { instance } from '.';
import { TeamInfoFilteredByInnings } from './type';

const requestPlayerHighLight = () => {
    return instance.get<TeamInfoFilteredByInnings>(
        import.meta.env.VITE_API_BASE_URL + `/id/hitters/list/processed-videos`
    );
};

export { requestPlayerHighLight };
