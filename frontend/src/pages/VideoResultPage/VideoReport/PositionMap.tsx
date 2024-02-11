import useCalculateWidthHeight from '@/hooks/useCalculateWidthHeight';
import createPositionMap from '@/utils/createPositionMap';
import { useEffect, useRef } from 'react';
import PlayerCard from './PlayerCard';
import { PlayerLineUp } from '@/api/type';

type PositionMap = {
    lineUp: PlayerLineUp[];
};

export default function PositionMap({ lineUp }: PositionMap) {
    console.log(lineUp);
    const positionMapRef = useRef(null);
    const { width, height } = useCalculateWidthHeight(positionMapRef);
    const canvasRef = useRef(null);
    useEffect(() => {
        createPositionMap(canvasRef, width, height);
    });

    return (
        <div className="videoReport-positionMap" ref={positionMapRef}>
            {lineUp.map((player: PlayerLineUp, i: number) => {
                return <PlayerCard key={player.hitterId} player={player} timer={i * 200} />;
            })}
            <canvas width={width} height={height} ref={canvasRef}></canvas>
        </div>
    );
}
