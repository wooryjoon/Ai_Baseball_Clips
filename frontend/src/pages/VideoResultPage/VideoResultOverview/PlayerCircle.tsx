import VideoModal from '@/components/Content/VideoModal';
import { useCallback, useRef, useState } from 'react';
import openModal from '@/utils/openModal';
import closeModal from '@/utils/closeModal';
import usePlayerPositionAnimate from '@/hooks/usePlayerPositionAnimate';
import { PlayerInfoFilteredByInnings } from '@/api/type';
import Lottie from 'lottie-react';
import FireAnimation from '@/assets/Lottie/fire.json';

interface PlayerCircle {
    playerInfo: PlayerInfoFilteredByInnings;
}
export default function PlayerCircle({ playerInfo }: PlayerCircle) {
    const videoRef = useRef<HTMLDialogElement>(null);
    const playerCircleRef = useRef<HTMLDivElement>(null);
    const [isReadyToLoadVideo, setIsReadyToLoadVideo] = useState(false);
    const { name, position, imageUrl, processedVideoByInnings } = playerInfo;

    const onClickPlayerCircle = () => {
        if (isReadyToLoadVideo === false) openModal(videoRef);
        else closeModal(videoRef);
        setIsReadyToLoadVideo(!isReadyToLoadVideo);
    };

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
                <div className="player-position">{position}</div>
                <img className="playerCircle" src={imageUrl}></img>
                <span>{name}</span>
                {processedVideoByInnings.length !== 0 && (
                    <Lottie animationData={FireAnimation} loop={true} className="fireLottie" />
                )}
            </div>
            {processedVideoByInnings.length !== 0 && (
                <VideoModal
                    ref={videoRef}
                    onClick={onClickPlayerCircle}
                    isReadyToLoadVideo={isReadyToLoadVideo}
                    processedVideo={processedVideoByInnings}
                />
            )}
        </>
    );
}
