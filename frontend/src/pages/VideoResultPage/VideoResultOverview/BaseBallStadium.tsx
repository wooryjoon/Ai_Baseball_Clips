import useCalculateWidthHeight from '@/hooks/useCalculateWidthHeight';
import React, { useRef } from 'react';
import Stadium from './Stadium';
import { useQuery } from '@tanstack/react-query';
import { requestTeamDataByInnings } from '@/api/requestOverview';
import PlayerCircle from './PlayerCircle';
import { PlayerInfoFilteredByInnings } from '@/api/type';

type Props = {
    currentTeam: 'firstTeam' | 'secondTeam';
    currentInning: number;
};

export default function BaseBallStadium({ currentTeam, currentInning }: Props) {
    const stadiumContainerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useCalculateWidthHeight(stadiumContainerRef);
    const { data, isLoading, isError } = useQuery({
        queryFn: requestTeamDataByInnings,
        queryKey: ['teamInfoByInnings', currentInning * 2 - 1],
    });
    if (isLoading) return <div>loading</div>;
    if (isError) return <div>Error</div>;
    if (data?.data) {
        return (
            <div className="stadium" ref={stadiumContainerRef}>
                {data.data[currentTeam].map((playerInfo: PlayerInfoFilteredByInnings) => {
                    return <PlayerCircle playerInfo={playerInfo} />;
                })}

                <Stadium canvasWidth={width} canvasHeight={height} />
            </div>
        );
    }
}
