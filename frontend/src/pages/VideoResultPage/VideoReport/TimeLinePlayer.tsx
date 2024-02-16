import { PlayerTimeLine } from '@/api/type';
import img from '@/assets/선수1.png';
type TimeLinePlayer = {
    player: PlayerTimeLine;
};

export default function TimeLinePlayer({ player }: TimeLinePlayer) {
    return (
        <div className="timeline-item-player">
            <img src={player.imageUrl} alt="" />
            <span>{player.name}</span>
        </div>
    );
}
