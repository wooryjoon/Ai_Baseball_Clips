import './Content.scss';
import { memo, useRef, useState } from 'react';
import VideoModal from './VideoModal';
import openModal from '@/utils/openModal';
import { Clip } from '@/pages/VideoResultPage/type';
import closeModal from '@/utils/closeModal';
import { ProcessedVideo, ProcessedVideoByInnings } from '@/api/type';
import SingleVideoModal from './SingleVideoModal';
import thumbnail from '@/assets/thumbnail.jfif';

type Content = {
    clip: ProcessedVideo;
};
//TODO : dialog tag를 활용해 썸네일 클릭 시 영상 전체 모달창 띄우기
function Content({ clip }: Content) {
    const videoDialogRef = useRef<HTMLDialogElement>(null);
    const [isReadyToLoadVideo, setIsReadyToLoadVideo] = useState(false);

    const onClickLoadVideoHandler = () => {
        if (isReadyToLoadVideo === false) openModal(videoDialogRef);
        else closeModal(videoDialogRef);
        setIsReadyToLoadVideo(!isReadyToLoadVideo);
    };
    return (
        <div className="content-container">
            <img
                src={thumbnail}
                className="thumbnail"
                onClick={() => {
                    openModal(videoDialogRef);
                    onClickLoadVideoHandler();
                }}
            ></img>
            <SingleVideoModal
                ref={videoDialogRef}
                processedVideo={clip}
                onClick={onClickLoadVideoHandler}
                isReadyToLoadVideo={isReadyToLoadVideo}
            />
        </div>
    );
}
export default memo(Content);
