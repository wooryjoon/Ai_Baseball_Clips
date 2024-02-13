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

export default function BaseBallStadium({ currentTeam, currentInning, teamData }: Props) {
    const reqId = useGetRequestId();
    const stadiumContainerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useCalculateWidthHeight(stadiumContainerRef);
    const { data, isLoading, isError } = useQuery({
        queryFn: () => requestTeamDataByInnings(reqId),
        queryKey: ['teamInfoByInnings', currentInning * 2 - 1, reqId],
    });
    if (isLoading) return <Loading />;
    if (isError) return <div>Error</div>;
    if (data?.data) {
        return (
            <div className="stadium" ref={stadiumContainerRef}>
                {data.data[currentTeam].map(
                    (playerInfo: PlayerInfoFilteredByInnings, i: number) => {
                        return <PlayerCircle key={i} playerInfo={playerInfo} />;
                    }
                )}
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
