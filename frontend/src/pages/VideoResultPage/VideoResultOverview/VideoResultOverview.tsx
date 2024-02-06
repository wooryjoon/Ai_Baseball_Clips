import { useRef, useState } from 'react';
import React from 'react';
import '../VideoResultPage.scss';
import Stadium from './Stadium';
import useCalculateWidthHeight from '@/hooks/useCalculateWidthHeight';
import PlayerCircle from './PlayerCircle';
import { overviewPlayData, overviewPlayData2 } from '@/mock/dummydata';
import ScoreBoard from './ScoreBoard';
type SelectedTeam = { team1: boolean; team2: boolean };
export default function VideoResultOverview() {
    //TODO stadium div의 width와 height를 계산해 stadium에 전달
    const stadiumContainerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useCalculateWidthHeight(stadiumContainerRef);
    const [canvasWidth, canvasHeight] = [width, height];
    const [currentTeam, setcurrentTeam] = useState<SelectedTeam>({
        team1: true,
        team2: false,
    });

    const onClickChangeTeam = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget instanceof HTMLElement) {
            if (currentTeam.team1 === true) {
                if (e.currentTarget.classList.contains('team1')) return;
            } else if (currentTeam.team2 === true) {
                if (e.currentTarget.classList.contains('team2')) return;
            }
            setcurrentTeam((prev: SelectedTeam) => {
                return { team1: !prev.team1, team2: !prev.team2 };
            });
        }
    };
    return (
        <>
            <ScoreBoard onClick={onClickChangeTeam} />
            <div className="stadium" ref={stadiumContainerRef}>
                {currentTeam.team1 === true
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
