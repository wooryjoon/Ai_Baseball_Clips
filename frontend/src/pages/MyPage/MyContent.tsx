import Button from '@/components/Button';
import Content from '@/components/Content';
import { FavoriteVideo } from '@/api/type';

interface MyContent {
    favoriteVideo: FavoriteVideo;
    onClick: (batId: number) => void;
}

export default function MyContent({ favoriteVideo, onClick }: MyContent) {
    return (
        <div className="myContent">
            <Content
                clip={{
                    batId: favoriteVideo.batId,
                    processedVideoUrl: favoriteVideo.processedVideoUrl,
                    pitcherName: favoriteVideo.pitcherInfo.name,
                    favorite: favoriteVideo.favorite,
                }}
            />
            <div className="myContent-info">
                <span>{favoriteVideo.createDateTime}</span>
                <span>
                    {favoriteVideo.hitterInfo.name} vs {favoriteVideo.pitcherInfo.name}
                </span>
                <span className="teams">
                    {favoriteVideo.hitterInfo.teamName} vs {favoriteVideo.pitcherInfo.teamName}
                </span>
            </div>
            <Button
                styleType="myContent"
                onClick={() => {
                    onClick(favoriteVideo.batId);
                }}
            >
                제거
            </Button>
        </div>
    );
}
