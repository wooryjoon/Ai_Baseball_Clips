export default function calculateInning(key: string) {
    let Inning = Math.floor(Number(key) / 2) + 1;
    if (Number(key) % 2 == 0) Inning -= 1;
    let currInning = Inning + '회';
    const currTime = Number(key) % 2 == 0 ? '말' : '초';

    return [currInning + currTime, currTime];
}
