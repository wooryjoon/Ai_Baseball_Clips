import PlayerVideoCard from './PlayerVideoCard';
import { VIDEO_DUMMY } from '@/mock/dummydata.ts';
export default function PlayerHighlights() {
    return (
        <>
            {VIDEO_DUMMY.map((player_data) => {
                return <PlayerVideoCard playerData={player_data} />;
            })}
        </>
    );
}
