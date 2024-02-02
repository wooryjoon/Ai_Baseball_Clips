import VideoCarousel from './VideoCarousel';
import { PlayerHighlightClips } from '@/pages/VideoResultPage/type';
import { memo } from 'react';
interface PlayerVideoCard {
    playerData: PlayerHighlightClips;
}

export default memo(function PlayerVideoCard({ playerData }: PlayerVideoCard) {
    return (
        <div className="player-video-card">
            <h1>{playerData.player} 선수 하이라이트</h1>
            <VideoCarousel videoList={playerData.videoList} />
        </div>
    );
});
