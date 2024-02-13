import { forwardRef } from 'react';
import Video from './Video';
import Dialog from '../Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { ProcessedVideoByInnings } from '@/api/type';

type SingleVideoModal = {
    isReadyToLoadVideo: boolean;
    processedVideo: ProcessedVideoByInnings;
    onClick: () => void;
};

const SingleVideoModal = forwardRef<HTMLDialogElement, SingleVideoModal>(
    ({ processedVideo, isReadyToLoadVideo, onClick }: SingleVideoModal, ref) => {
        return (
            <Dialog onClick={onClick} ref={ref}>
                {isReadyToLoadVideo && (
                    <div className="video-container">
                        <div className="videoModal-title">
                            <FontAwesomeIcon
                                icon={faBookmark}
                                className={
                                    processedVideo.favorite ? 'bookmark favorite' : 'bookmark'
                                }
                            />
                            <span>VS {[processedVideo.pitcherName]}</span>

                            <button onClick={onClick}>X</button>
                        </div>

                        <Video poster="" src={processedVideo.processedVideoUrl} source_type="mp4" />
                    </div>
                )}
            </Dialog>
        );
    }
);

export default SingleVideoModal;
