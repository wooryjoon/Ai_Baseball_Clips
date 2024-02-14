import { PlayerInfoFilteredByInnings } from '@/api/type';
import VideoCarousel from './VideoCarousel';

interface PlayerVideoCard {
    player: PlayerInfoFilteredByInnings;
}

export default (function PlayerVideoCard({ player }: PlayerVideoCard) {
    return (
        <div className="player-video-card">
            <h1>{player.name}선수 타석 영상</h1>
            <VideoCarousel videoList={player.processedVideoByInnings} />
        </div>
    );
});
