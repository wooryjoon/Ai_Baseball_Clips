import useCalculateWidthHeight from '@/hooks/useCalculateWidthHeight';
import React, { useRef } from 'react';
import Stadium from './Stadium';
import { useQuery } from '@tanstack/react-query';
import { requestTeamDataByInnings } from '@/api/requestOverview';
import PlayerCircle from './PlayerCircle';
import { PlayerInfoFilteredByInnings, TeamInfo } from '@/api/type';
import Loading from '@/components/Loading';
import useGetRequestId from '@/hooks/useGetRequestId';

type Props = {
    currentTeam: 'firstTeam' | 'secondTeam';
    currentInning: number;
    teamData: TeamInfo;
};
// 팀이 바뀌면 구장도 계속 바뀐다. -> memo 비효율
export default function BaseBallStadium({ currentTeam, currentInning, teamData }: Props) {
    const reqId = useGetRequestId();
    const stadiumContainerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useCalculateWidthHeight(stadiumContainerRef);
    const { data, isLoading, isError } = useQuery({
        queryFn: requestTeamDataByInnings,
        queryKey: ['teamInfoByInnings', { currentInning: currentInning * 2 - 1, reqId: reqId }],
    });
    if (isLoading) return <Loading />;
    if (isError) return <div>Error</div>;
    if (data?.data) {
        // console.log(data.data);
        return (
            <div className="stadium" ref={stadiumContainerRef}>
                {data.data[currentTeam]
                    .slice(0, 10)
                    .map((playerInfo: PlayerInfoFilteredByInnings, i: number) => {
                        // console.log(playerInfo);
                        return <PlayerCircle key={i} playerInfo={playerInfo} />;
                    })}
                <img
                    src={
                        currentTeam === 'firstTeam'
                            ? teamData.firstTeamImageUrl
                            : teamData.secondTeamImageUrl
                    }
                    className="stadium-teamLogo"
                ></img>

                <Stadium canvasWidth={width} canvasHeight={height} />
            </div>
        );
    }
}
