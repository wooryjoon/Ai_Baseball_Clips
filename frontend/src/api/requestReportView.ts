import { useQuery } from '@tanstack/react-query';
import { instance } from '.';
import { TeamInfo, TeamLineUp, TeamTimeLine } from './type';

const requestTeamInfo = async (reqId: number) => {
    console.log(reqId);
    return await instance.get<TeamInfo>(import.meta.env.VITE_API_BASE_URL + `/${reqId}/bat/team`);
};

const requestStartLineUp = async (reqId: number) => {
    return await instance.get<TeamLineUp>(
        import.meta.env.VITE_API_BASE_URL + `/${reqId}/bat/line-up`
    );
};

const requestTimeLine = async (reqId: number) => {
    return await instance.get<TeamTimeLine>(
        import.meta.env.VITE_API_BASE_URL + `/${reqId}/bat/time-line`
    );
};

const reportPageQuery = (reqId: number) => {
    const teamInfo = useQuery({
        queryFn: () => requestTeamInfo(reqId),
        queryKey: ['parallel-teamInfo', reqId],
    });
    const lineUp = useQuery({
        queryFn: () => requestStartLineUp(reqId),
        queryKey: ['parallel-startLineUp', reqId],
    });
    const timeLine = useQuery({
        queryFn: () => requestTimeLine(reqId),
        queryKey: ['parallel-timeLine', reqId],
    });

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
