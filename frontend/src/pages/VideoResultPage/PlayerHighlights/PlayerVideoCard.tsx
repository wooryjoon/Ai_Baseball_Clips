import { PlayerInfoFilteredByInnings } from '@/api/type';
import VideoCarousel from './VideoCarousel';
import { PlayerHighlightClips } from '@/pages/VideoResultPage/type';
import { memo } from 'react';
interface PlayerVideoCard {
    player: PlayerInfoFilteredByInnings;
}

export default memo(function PlayerVideoCard({ player }: PlayerVideoCard) {
    return (
        <div className="player-video-card">
            <h1>{player.name}선수 하이라이트</h1>
            <VideoCarousel videoList={player.processedVideoByInnings} />
        </div>
    );
});
