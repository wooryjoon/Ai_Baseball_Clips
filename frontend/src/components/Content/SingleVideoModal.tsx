import { forwardRef, useState } from 'react';
import Video from './Video';
import Dialog from '../Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { ProcessedVideo } from '@/api/type';
import { requestFavorite } from '@/api/requestFavorite';
import { useMutation } from '@tanstack/react-query';
type SingleVideoModal = {
    isReadyToLoadVideo: boolean;
    processedVideo: ProcessedVideo;
    onClick: () => void;
};

const SingleVideoModal = forwardRef<HTMLDialogElement, SingleVideoModal>(
    ({ processedVideo, isReadyToLoadVideo, onClick }: SingleVideoModal, ref) => {
        const [isFavorite, setIsFavorite] = useState(processedVideo.favorite);
        const { mutate: deleteFavoriteVideo } = useMutation({
            mutationFn: (batId: number) => requestFavorite({ batId }),
        });
        return (
            <Dialog onClick={onClick} ref={ref}>
                {isReadyToLoadVideo && (
                    <div className="video-container">
                        <div className="videoModal-title">
                            <FontAwesomeIcon
                                icon={faBookmark}
                                className={isFavorite ? 'bookmark favorite' : 'bookmark'}
                                onClick={() => {
                                    deleteFavoriteVideo(processedVideo.batId);
                                    setIsFavorite(!isFavorite);
                                }}
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
