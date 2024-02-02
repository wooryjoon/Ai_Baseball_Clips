import VideoCarousel from './VideoCarousel';
import { PlayerHighlightClips } from '@/pages/VideoResultPage/type';

interface PlayerVideoCard {
    playerData: PlayerHighlightClips;
}

export default function PlayerVideoCard({ playerData }: PlayerVideoCard) {
    return (
        <div className="player-video-card">
            <h1>{playerData.player} 선수 하이라이트</h1>
            <VideoCarousel videoList={playerData.videoList} />
        </div>
    );
}
