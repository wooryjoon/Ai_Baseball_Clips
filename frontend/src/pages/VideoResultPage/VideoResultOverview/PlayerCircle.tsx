import VideoModal from '@/components/Content/VideoModal';
import { useRef, useState } from 'react';
import positionLocaiton from '@/utils/positionLocation';
import openModal from '@/utils/openModal';
import closeModal from '@/utils/closeModal';

interface PlayerCircle {
    data: any;
}
export default function PlayerCircle({ data }: PlayerCircle) {
    const videoRef = useRef<HTMLDialogElement>(null);
    const [isReadyToLoadVideo, setIsReadyToLoadVideo] = useState(false);
    const onClickPlayerCircle = () => {
        if (isReadyToLoadVideo === false) openModal(videoRef);
        else closeModal(videoRef);
        setIsReadyToLoadVideo(!isReadyToLoadVideo);
    };
    const { position, clip }: any = data;
    return (
        <>
            <div
                className="playerCircle-container"
                style={{
                    top: positionLocaiton[position].top + '%',
                    left: positionLocaiton[position].left + '%',
                }}
                onClick={() => {
                    openModal(videoRef);
                    onClickPlayerCircle();
                }}
            >
                <div className="playerCircle"></div>
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
