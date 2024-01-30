import VideoCarousel from './VideoCarousel';

interface PlayerVideoCard {}

export default function PlayerVideoCard({ playerData }: any) {
    return (
        <div className="player-video-card">
            <h1>{playerData.name} 선수 하이라이트</h1>
            <VideoCarousel url={playerData.url} />
        </div>
    );
}
