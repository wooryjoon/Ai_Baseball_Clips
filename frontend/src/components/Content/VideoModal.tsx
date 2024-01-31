import { forwardRef } from 'react';
import Video from './Video';
import Dialog from '../Dialog';

type VideoModalProps = {
    url: string;
    isReadyToLoadVideo: boolean;
    onClick: () => void;
};

const VideoModal = forwardRef<HTMLDialogElement, VideoModalProps>(
    ({ url, isReadyToLoadVideo, onClick }, ref) => {
        return (
            <Dialog onClick={onClick} ref={ref}>
                {isReadyToLoadVideo && (
                    <div className="video-container">
                        <div className="videoModal-title">영상 제목</div>
                        <Video
                            poster="https://source.unsplash.com/random/?programming"
                            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            source_type="mp4"
                        />
                    </div>
                )}
            </Dialog>
        );
    }
);

export default VideoModal;
