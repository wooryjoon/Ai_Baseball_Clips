import { memo } from 'react';

interface Clip {
    poster: string;
    src: string;
    source_type: string;
}

function Video({ poster, src, source_type }: Clip) {
    return (
        <video autoPlay loop playsInline controls poster={poster}>
            <source
                src={'https://a305-project-bucket.s3.ap-northeast-2.amazonaws.com/' + src}
                type={`video/${source_type}`}
            />
        </video>
    );
}
export default memo(Video);
