import usePlayerCardAnimate from '@/hooks/usePlayerCardAnimate';
import { useRef } from 'react';
import positionLocation from '@/utils/positionLocation';
type Props = {
    data: any;
    timer: number;
};

export default function PlayerCard({ data, timer }: Props) {
    const playerCardRef = useRef(null);
    usePlayerCardAnimate(playerCardRef, timer);
    return (
        <div
            className="playerCard-container"
            ref={playerCardRef}
            style={{
                top: positionLocation[data.position].top + '%',
                left: positionLocation[data.position].left + '%',
            }}
        >
            <img src="src/assets/선수1.png" alt="" />
            <span>이대호</span>
        </div>
    );
}
