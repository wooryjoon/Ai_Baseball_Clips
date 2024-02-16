import React from 'react';

interface Team {
    name: string;
    imageUrl: string;
}

type TeamLogo = {
    teamData: Team;
    team: 'firstTeam' | 'secondTeam';
    currentTeam: 'firstTeam' | 'secondTeam';
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function TeamLogo({ onClick, teamData, team, currentTeam }: TeamLogo) {
    let className = 'teamLogo-container';
    if (team === currentTeam) className += ' current';
    return (
        <div className={className} onClick={onClick}>
            <img src={teamData.imageUrl} alt="" />
            <span>{teamData.name}</span>
        </div>
    );
}
