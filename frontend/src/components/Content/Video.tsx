import React from 'react';

interface Video {
    poster: string;
    src: string;
    source_type: string;
}

export default function Video({ poster, src, source_type }: Video) {
    return (
        <video autoPlay loop playsInline controls poster={poster}>
            <source src={src} type={`video/${source_type}`} />
        </video>
    );
}
