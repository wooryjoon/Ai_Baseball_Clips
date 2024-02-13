import { TeamInfo } from '@/api/type';
import React from 'react';
import TeamLogo from './TeamLogo';
import { SelectedTeam } from '../VideoResultOverview/VideoResultOverview';

type TeamSelectBar = {
    teamData: TeamInfo;
    currentTeam: SelectedTeam;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function TeamSelectBar({ onClick, teamData, currentTeam }: TeamSelectBar) {
    return (
        <div className="teamSelectBar">
            <TeamLogo
                onClick={onClick}
                team="firstTeam"
                currentTeam={currentTeam}
                teamData={{ name: teamData.firstTeamName, imageUrl: teamData.firstTeamImageUrl }}
            />
            <TeamLogo
                onClick={onClick}
                team="secondTeam"
                currentTeam={currentTeam}
                teamData={{ name: teamData.secondTeamName, imageUrl: teamData.secondTeamImageUrl }}
            />
        </div>
    );
}
