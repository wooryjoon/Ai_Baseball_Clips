import usePlayerCardAnimate from '@/hooks/usePlayerCardAnimate';
import { useRef } from 'react';
import positionLocation from '@/utils/positionLocation';
import { PlayerLineUp } from '@/api/type';
type Props = {
    player: PlayerLineUp;
    timer: number;
};

export default function PlayerCard({ player, timer }: Props) {
    const playerCardRef = useRef(null);
    usePlayerCardAnimate(playerCardRef, timer);
    return (
        <div
            className="playerCard-container"
            ref={playerCardRef}
            style={{
                top: positionLocation[player.position].top + '%',
                left: positionLocation[player.position].left + '%',
            }}
        >
            <img src={player.playerImage} alt="" />
            <span>{player.name}</span>
        </div>
    );
}
