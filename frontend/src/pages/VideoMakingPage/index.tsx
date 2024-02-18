import Header from '@/components/Header';
import { useDispatch, useSelector } from 'react-redux';
import './MakingVideo.scss';
import ProgressBar from './ProgressBar';
import UploadVideo from './UploadVideo';
import isUploadedSlice, { setIsUploaded } from '@/store/slice/isUploadedSlice';
import { AppDispatch, RootState } from '@/store/store';

export default function MakingVideo() {
    const isUploaded = useSelector((state: RootState) => state.isUploaded);

    return (
        <>
            <Header />
            { !isUploaded ? <UploadVideo/> : <ProgressBar/> }
        </>
    );
}
