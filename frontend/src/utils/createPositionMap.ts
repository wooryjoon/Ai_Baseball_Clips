import { RefObject } from 'react';
import { lineColor } from './canvas';

export default function createPositionMap(
    canvasRef: RefObject<HTMLCanvasElement>,
    canvasWidth: number,
    canvasHeight: number
) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
        context.beginPath();
        context.moveTo(0, canvasHeight * 0.65); // x, y
        context.lineTo(canvasWidth / 2, canvasHeight); // x, y
        lineColor(context, 'white');
        context.beginPath();
        context.moveTo(canvasWidth, canvasHeight * 0.65); // x, y
        context.lineTo(canvasWidth / 2, canvasHeight); // x, y
        lineColor(context, 'white');
        context.arc(canvasWidth / 2, canvasHeight, 50, 1.25 * Math.PI, 1.747 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#E7DC8C';
        context.fill();
    }
}
