import { useQuery } from '@tanstack/react-query';
import { instance } from '.';
import { TeamInfo, TeamLineUp, TeamTimeLine } from './type';

const requestTeamInfo = () => {
    return instance.get<TeamInfo>(import.meta.env.VITE_API_BASE_URL + '/id/bat/name');
};

const requestStartLineUp = () => {
    return instance.get<TeamLineUp>(import.meta.env.VITE_API_BASE_URL + '/id/bat/line-up');
};

const requestTimeLine = () => {
    return instance.get<TeamTimeLine>(import.meta.env.VITE_API_BASE_URL + '/id/bat/time-line');
};

const overviewPageQuery = () => {
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

export default overviewPageQuery;
