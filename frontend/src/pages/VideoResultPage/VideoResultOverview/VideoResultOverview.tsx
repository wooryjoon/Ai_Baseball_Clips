import { useEffect, useRef, useState } from 'react';
import '../VideoResultPage.scss';
import RGB from './RGB';
import Stadium from './Stadium';
import useCalculateWidthHeight from '@/hooks/useCalculateWidthHeight';
import PlayerCircle from './PlayerCircle';

import { overviewPlayData, overviewPlayData2 } from '@/mock/dummydata';
export default function VideoResultOverview() {
    //TODO stadium div의 width와 height를 계산해 stadium에 전달
    const stadiumContainerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useCalculateWidthHeight(stadiumContainerRef);
    const [canvasWidth, canvasHeight] = [width, height];
    const [showTeam1, setShowTeam1] = useState(true);

    const onClickChangeTeam = () => {
        setShowTeam1(!showTeam1);
    };
    return (
        <>
            <div className="team-select">
                <span className="team-select-title">SCORE</span>
                <RGB />
                <div className="scoreboard">
                    <div className="team-card" onClick={onClickChangeTeam}>
                        <img src="/src/assets/BaseBallTeam/KT.png" alt="" />
                        KT 위즈
                    </div>
                    <div className="score">5:4</div>
                    <div className="team-card" onClick={onClickChangeTeam}>
                        <img src="/src/assets/BaseBallTeam/LG.png" alt="" />
                        LG 트윈스
                    </div>
                </div>
                <RGB />
            </div>
            {/* 야구장 이미지 */}
            <div className="stadium" ref={stadiumContainerRef}>
                {showTeam1 === true
                    ? overviewPlayData.map((data: any) => (
                          <PlayerCircle data={data} src="/src/assets/선수1.png" />
                      ))
                    : overviewPlayData2.map((data: any) => (
                          <PlayerCircle data={data} src="/src/assets/ball.png" />
                      ))}
                <Stadium canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
            </div>
        </>
    );
}
