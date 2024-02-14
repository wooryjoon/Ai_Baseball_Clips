import { instance } from '.';
import { TeamInfoFilteredByInnings } from './type';
import { QueryFunctionContext } from '@tanstack/react-query';

const requestTeamDataByInnings = async ({ queryKey }: QueryFunctionContext<[string, any]>) => {
    const [_key, { currentInning, reqId }] = queryKey;
    return await instance.get<TeamInfoFilteredByInnings>(
        import.meta.env.VITE_API_BASE_URL + `/${reqId}/hitter/list/${currentInning}/processed-video`
    );
};

export { requestTeamDataByInnings };
