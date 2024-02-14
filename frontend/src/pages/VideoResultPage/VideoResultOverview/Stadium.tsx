import { RefObject, memo, useEffect, useRef } from 'react';
import './VideoResultOverview.scss';
import createStadium from '@/utils/createStadium';
import { TeamInfo } from '@/api/type';
interface Stadium {
    canvasWidth: number;
    canvasHeight: number;
}
function Stadium({ canvasWidth, canvasHeight }: Stadium) {
    const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        createStadium(canvasRef, canvasWidth, canvasHeight);
    });

    return (
        <canvas
            className="canvas"
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
        ></canvas>
    );
}
export default memo(Stadium);
