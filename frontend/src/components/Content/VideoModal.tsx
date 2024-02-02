import { forwardRef } from 'react';
import Video from './Video';
import Dialog from '../Dialog';
import { Clip } from '@/pages/VideoResultPage/type';

type VideoModal = {
    clip: Clip;
    isReadyToLoadVideo: boolean;
    onClick: () => void;
};

const VideoModal = forwardRef<HTMLDialogElement, VideoModal>(
    ({ clip, isReadyToLoadVideo, onClick }: VideoModal, ref) => {
        return (
            <Dialog onClick={onClick} ref={ref}>
                {isReadyToLoadVideo && (
                    <div className="video-container">
                        <div className="videoModal-title">영상 제목</div>
                        <Video
                            poster={clip.poster}
                            src={clip.url}
                            title={clip.title}
                            source_type="mp4"
                        />
                    </div>
                )}
            </Dialog>
        );
    }
);

export default VideoModal;
