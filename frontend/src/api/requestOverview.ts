import { instance } from '.';
import { TeamInfoFilteredByInnings } from './type';
import { QueryFunctionContext } from '@tanstack/react-query';

const requestTeamDataByInnings = ({ queryKey }: QueryFunctionContext<[string, number]>) => {
    const [_key, currentInning] = queryKey;
    return instance.get<TeamInfoFilteredByInnings>(
        import.meta.env.VITE_API_BASE_URL + `/id/hitter/list/${currentInning}/processed-video`
    );
};

export { requestTeamDataByInnings };
