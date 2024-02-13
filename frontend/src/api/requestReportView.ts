import { useQuery } from '@tanstack/react-query';
import { instance } from '.';
import { TeamInfo, TeamLineUp, TeamTimeLine } from './type';

const requestTeamInfo = async () => {
    return await instance.get<TeamInfo>(import.meta.env.VITE_API_BASE_URL + '/id/bat/team');
};

const requestStartLineUp = async () => {
    return await instance.get<TeamLineUp>(import.meta.env.VITE_API_BASE_URL + '/id/bat/line-up');
};

const requestTimeLine = async () => {
    return await instance.get<TeamTimeLine>(
        import.meta.env.VITE_API_BASE_URL + '/id/bat/time-line'
    );
};

const reportPageQuery = () => {
    const teamInfo = useQuery({ queryFn: requestTeamInfo, queryKey: ['parallel-teamInfo'] });
    const lineUp = useQuery({ queryFn: requestStartLineUp, queryKey: ['parallel-startLineUp'] });
    const timeLine = useQuery({ queryFn: requestTimeLine, queryKey: ['parallel-timeLine'] });

    const isLoading = teamInfo.isLoading && lineUp.isLoading && timeLine.isLoading;
    const isError = teamInfo.isError && lineUp.isError && timeLine.isError;
    const data = {
        teamInfo: teamInfo.data?.data,
        lineUp: lineUp.data?.data,
        timeLine: timeLine.data?.data,
    };
    return { data, isLoading, isError };
};

export { requestTeamInfo, requestStartLineUp, requestTimeLine };
export default reportPageQuery;
