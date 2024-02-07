import { useRef, useState } from 'react';
import React from 'react';
import '../VideoResultPage.scss';
import Stadium from './Stadium';
import useCalculateWidthHeight from '@/hooks/useCalculateWidthHeight';
import PlayerCircle from './PlayerCircle';
import { overviewPlayData, overviewPlayData2 } from '@/mock/dummydata';
import ScoreBoard from './ScoreBoard';

export type SelectedTeam = 'team1' | 'team2';
export default function VideoResultOverview() {
    //TODO stadium div의 width와 height를 계산해 stadium에 전달
    const stadiumContainerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useCalculateWidthHeight(stadiumContainerRef);
    const [canvasWidth, canvasHeight] = [width, height];
    const [currentTeam, setcurrentTeam] = useState<SelectedTeam>('team1');

    const onClickChangeTeam = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.currentTarget.classList);
        if (e.currentTarget instanceof HTMLElement) {
            if (currentTeam === 'team1' && e.currentTarget.classList.contains('team1')) return;
            else if (currentTeam === 'team2' && e.currentTarget.classList.contains('team2')) return;
            setcurrentTeam((prev: SelectedTeam) => {
                if (prev === 'team1') return 'team2';
                else return 'team1';
            });
        }
    };
    return (
        <>
            <ScoreBoard onClick={onClickChangeTeam} currentTeam={currentTeam} />
            <div className="stadium" ref={stadiumContainerRef}>
                {currentTeam === 'team1'
                    ? overviewPlayData.map((data: any) => (
                          <PlayerCircle data={data} src="/src/assets/선수1.png" />
                      ))
                    : overviewPlayData2.map((data: any) => (
                          <PlayerCircle data={data} src="/src/assets/선수2.png" />
                      ))}
                {/* 야구장 이미지 */}
                <Stadium canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
            </div>
        </>
    );
}
