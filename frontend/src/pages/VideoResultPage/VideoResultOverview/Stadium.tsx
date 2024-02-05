import { RefObject, useEffect, useRef } from 'react';
import './VideoResultOverview.scss';
import createStadium from '@/utils/createStadium';
interface Stadium {
    canvasWidth: number;
    canvasHeight: number;
}
export default function Stadium({ canvasWidth, canvasHeight }: Stadium) {
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
