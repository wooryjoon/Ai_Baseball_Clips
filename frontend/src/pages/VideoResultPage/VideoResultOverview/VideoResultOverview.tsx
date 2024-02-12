import { useRef, useState } from 'react';
import React from 'react';
import '../VideoResultPage.scss';
import ScoreBoard from './ScoreBoard';
import BaseBallStadium from './BaseBallStadium';

export type SelectedTeam = 'firstTeam' | 'secondTeam';
export default function VideoResultOverview() {
    //TODO 회별로 API 잘 가는지 테스트

    const [currentTeam, setcurrentTeam] = useState<SelectedTeam>('firstTeam');
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
            setcurrentTeam((prev: SelectedTeam) => {
                if (prev === 'firstTeam') return 'secondTeam';
                else return 'firstTeam';
            });
        }
    };
    const onClickChangeInning = (inning: number) => {
        setCurrentInning(inning);
    };

    return (
        <>
            <ScoreBoard
                onClickInning={onClickChangeInning}
                onClickTeam={onClickChangeTeam}
                currentTeam={currentTeam}
                currentInning={currentInning}
            />
            <BaseBallStadium currentTeam={currentTeam} currentInning={currentInning} />
        </>
    );
}
