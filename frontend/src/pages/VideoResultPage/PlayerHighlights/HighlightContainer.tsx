import { requestTeamDataByInnings } from '@/api/requestOverview';
import { requestPlayerHighLight } from '@/api/requestPlayerHighLight';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PlayerVideoCard from './PlayerVideoCard';
import useGetRequestId from '@/hooks/useGetRequestId';
import Loading from '@/components/Loading';

type HighlightContainer = {
    team: 'firstTeam' | 'secondTeam';
};

export default function HighlightContainer({ team }: HighlightContainer) {
    // return {clips.map((player_data) => {
    //     return <PlayerVideoCard key={player_data.id} playerData={player_data} />;
    // })}
    const reqId = useGetRequestId();
    const { data, isLoading, isError } = useQuery({
        queryFn: () => requestPlayerHighLight(reqId),
        queryKey: ['requestPlayerHighLight', reqId],
    });
    if (isLoading) return <Loading />;

    if (data?.data) {
        return (
            <div className="player-highlight">
                {data.data[team].map((player, i) => {
                    return <PlayerVideoCard key={i} player={player} />;
                })}
            </div>
        );
    }
}
