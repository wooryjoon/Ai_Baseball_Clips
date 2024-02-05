import VideoModal from '@/components/Content/VideoModal';
import { useEffect, useRef, useState } from 'react';
import positionLocaiton from '@/utils/positionLocation';
import openModal from '@/utils/openModal';
import closeModal from '@/utils/closeModal';

interface PlayerCircle {
    data: any;
    src: string;
}
export default function PlayerCircle({ data, src }: PlayerCircle) {
    const videoRef = useRef<HTMLDialogElement>(null);
    const playerCircleRef = useRef<HTMLDivElement>(null);
    const [isReadyToLoadVideo, setIsReadyToLoadVideo] = useState(false);
    const onClickPlayerCircle = () => {
        if (isReadyToLoadVideo === false) openModal(videoRef);
        else closeModal(videoRef);
        setIsReadyToLoadVideo(!isReadyToLoadVideo);
    };
    const { position, clip }: any = data;
    //TODO : 포지션에 따라 top,left 위치 조정
    useEffect(() => {
        let keyframes = [
            {
                top: '40%',
                left: '44%',
            },
            {
                top: positionLocaiton[position].top + '%',
                left: positionLocaiton[position].left + '%',
            },
        ];
        let options: KeyframeAnimationOptions = {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards',
        };

        const tick: number = setTimeout(() => {
            if (playerCircleRef.current) playerCircleRef.current.animate(keyframes, options);
        }, 500);

        return () => clearTimeout(tick);
    }, []);
    return (
        <>
            <div
                ref={playerCircleRef}
                className="playerCircle-container"
                style={{
                    top: '40%',
                    left: '44%',
                }}
                onClick={() => {
                    openModal(videoRef);
                    onClickPlayerCircle();
                }}
            >
                <img className="playerCircle" src={src}></img>
                <span>이대호</span>
            </div>
            <VideoModal
                ref={videoRef}
                onClick={onClickPlayerCircle}
                isReadyToLoadVideo={isReadyToLoadVideo}
                clip={clip}
            />
        </>
    );
}
