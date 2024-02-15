import { RefObject } from 'react';
import { lineColor } from './canvas';

export default function createStadium(
    canvasRef: RefObject<HTMLCanvasElement>,
    canvasWidth: number,
    canvasHeight: number
) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
        context.beginPath();
        context.moveTo(0, canvasHeight / 2 - 20); // x, y
        context.lineTo(canvasWidth / 2, canvasHeight - 20); // x, y
        lineColor(context, 'white');
        context.beginPath();
        context.moveTo(canvasWidth, canvasHeight / 2 - 20); // x, y
        context.lineTo(canvasWidth / 2, canvasHeight - 20); // x, y
        lineColor(context, 'white');
        context.arc(
            canvasWidth / 2,
            canvasHeight - 20,
            160,
            1.27 * Math.PI,
            1.735 * Math.PI,
            false
        );
        context.closePath();
        context.fillStyle = '#E7DC8C';
        context.fill();

        // context.beginPath();
        // context.moveTo(canvasWidth / 4, (canvasHeight / 4) * 3);
        // context.lineTo(canvasWidth / 2, canvasHeight / 2 + 40);
        // lineColor(context, 'white');
    }
}
