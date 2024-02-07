import useCalculateWidthHeight from '@/hooks/useCalculateWidthHeight';
import createPositionMap from '@/utils/createPositionMap';
import { useEffect, useRef } from 'react';
import PlayerCard from './PlayerCard';
import { overviewPlayData } from '@/mock/dummydata';

export default function PositionMap() {
    const positionMapRef = useRef(null);
    const { width, height } = useCalculateWidthHeight(positionMapRef);
    const canvasRef = useRef(null);
    useEffect(() => {
        createPositionMap(canvasRef, width, height);
    });

    return (
        <div className="videoReport-positionMap" ref={positionMapRef}>
            {overviewPlayData.map((data: any, i: any) => {
                return <PlayerCard data={data} timer={i * 200} />;
            })}
            <canvas width={width} height={height} ref={canvasRef}></canvas>
        </div>
    );
}
