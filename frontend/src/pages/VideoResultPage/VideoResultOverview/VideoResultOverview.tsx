import { useEffect, useRef, useState } from 'react';
import '../VideoResultPage.scss';
import RGB from './RGB';
import Stadium from './Stadium';
import useCalculateWidthHeight from '@/hooks/useCalculateWidthHeight';
import PlayerCircle from './PlayerCircle';

import { overviewPlayData } from '@/mock/dummydata';
export default function VideoResultOverview() {
    //TODO stadium div의 width와 height를 계산해 stadium에 전달
    const stadiumContainerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useCalculateWidthHeight(stadiumContainerRef);
    const [canvasWidth, canvasHeight] = [width, height];

    return (
        <>
            <div className="team-select">
                <span className="team-select-title">SCORE</span>
                <RGB />
                <div className="scoreboard">
                    <div className="team-card">
                        <img src="/src/assets/BaseBallTeam/KT.png" alt="" />
                        KT 위즈
                    </div>
                    <div className="score">5:4</div>
                    <div className="team-card">
                        <img src="/src/assets/BaseBallTeam/LG.png" alt="" />
                        LG 트윈스
                    </div>
                </div>
                <RGB />
            </div>
            {/* 야구장 이미지 */}
            <div className="stadium" ref={stadiumContainerRef}>
                {overviewPlayData.map((data: any) => (
                    <PlayerCircle data={data} />
                ))}
                {/* <div className="stadium-logo">
                    <div>
                        <span className="upper">A</span>i
                    </div>
                    <div>
                        <span className="upper">B</span>aseball
                    </div>
                    <div>
                        <span className="upper">C</span>lips
                    </div>
                </div> */}
                <Stadium canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
            </div>
        </>
    );
}
