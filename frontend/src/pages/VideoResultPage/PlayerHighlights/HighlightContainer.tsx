import { requestTeamDataByInnings } from '@/api/requestOverview';
import { requestPlayerHighLight } from '@/api/requestPlayerHighLight';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PlayerVideoCard from './PlayerVideoCard';

type HighlightContainer = {
    team: 'firstTeam' | 'secondTeam';
};

export default function HighlightContainer({ team }: HighlightContainer) {
    // return {clips.map((player_data) => {
    //     return <PlayerVideoCard key={player_data.id} playerData={player_data} />;
    // })}
    const { data, isLoading, isError } = useQuery({
        queryFn: requestPlayerHighLight,
        queryKey: ['requestPlayerHighLight'],
    });
    if (data?.data)
        return (
            <div className="player-highlight">
                {data.data[team].map((player, i) => {
                    return <PlayerVideoCard key={i} player={player} />;
                })}
            </div>
        );
}
