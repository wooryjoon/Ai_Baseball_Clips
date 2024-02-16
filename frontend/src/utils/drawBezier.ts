export default function drawBezier(
    ctx: CanvasRenderingContext2D,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    // 시작점 지정
    ctx.moveTo(x0, y0);
    //제어점 좌표와 종료점 좌표 지정
    ctx.quadraticCurveTo(x1, y1, x2, y2);
    ctx.stroke();
}

// function lerp({ v0, v1, t }: lerp) {
//     return (1.0 - t) * v0 + t * v1;
// }
