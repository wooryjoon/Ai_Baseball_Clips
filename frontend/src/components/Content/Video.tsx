import { memo } from 'react';
import thumbnail from '@/assets/thumbnail.jfif';
interface Clip {
    poster: string;
    src: string;
    source_type: string;
}

function Video({ poster, src, source_type }: Clip) {
    return (
        <video autoPlay loop playsInline controls poster={thumbnail}>
            <source src={src} type={`video/${source_type}`} />
        </video>
    );
}
export default memo(Video);
