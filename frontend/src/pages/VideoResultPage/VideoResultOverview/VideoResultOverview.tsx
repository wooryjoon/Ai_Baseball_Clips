import { useRef, useState } from 'react';
import React from 'react';
import '../VideoResultPage.scss';
import './VideoResultOverview.scss';
import ScoreBoard from './ScoreBoard';
import BaseBallStadium from './BaseBallStadium';
import { requestTeamInfo } from '@/api/requestReportView';
import { useQuery } from '@tanstack/react-query';

export type SelectedTeam = 'firstTeam' | 'secondTeam';
export default function VideoResultOverview() {
    //TODO 쿼리 한번에 받자..

    const [currentTeam, setCurrentTeam] = useState<SelectedTeam>('firstTeam');
    const [currentInning, setCurrentInning] = useState<number>(1);
    const onClickChangeTeam = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget instanceof HTMLElement) {
            if (currentTeam === 'firstTeam' && e.currentTarget.classList.contains('firstTeam'))
                return;
            else if (
                currentTeam === 'secondTeam' &&
                e.currentTarget.classList.contains('secondTeam')
            )
                return;
            setCurrentTeam((prev: SelectedTeam) => {
                if (prev === 'firstTeam') return 'secondTeam';
                else return 'firstTeam';
            });
        }
    };
    const onClickChangeInning = (inning: number) => {
        setCurrentInning(inning);
    };

    const {
        data: teamData,
        isLoading,
        isError,
    } = useQuery({ queryFn: requestTeamInfo, queryKey: ['teamInfo'] });

    if (isLoading) return <div>isLoading</div>;
    if (teamData)
        return (
            <>
                <ScoreBoard
                    onClickInning={onClickChangeInning}
                    onClickTeam={onClickChangeTeam}
                    currentTeam={currentTeam}
                    currentInning={currentInning}
                    teamData={teamData.data}
                />
                <BaseBallStadium
                    currentTeam={currentTeam}
                    currentInning={currentInning}
                    teamData={teamData.data}
                />
            </>
        );
}
