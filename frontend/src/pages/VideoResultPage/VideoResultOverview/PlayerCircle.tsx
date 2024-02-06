import VideoModal from '@/components/Content/VideoModal';
import { useEffect, useRef, useState } from 'react';
import openModal from '@/utils/openModal';
import closeModal from '@/utils/closeModal';
import usePlayerPositionAnimate from '@/hooks/usePlayerPositionAnimate';

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
    usePlayerPositionAnimate(playerCircleRef, position);
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
                <div className="player-position">CF</div>
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
