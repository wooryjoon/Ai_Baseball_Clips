import { forwardRef } from 'react';
import Video from './Video';
import Dialog from '../Dialog';
import { Clip } from '@/pages/VideoResultPage/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

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
                        <div className="videoModal-title">
                            <FontAwesomeIcon icon={faBookmark} className="bookmark" />
                            <span>고우석 vs 이대호</span>

                            <button onClick={onClick}>X</button>
                        </div>

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
