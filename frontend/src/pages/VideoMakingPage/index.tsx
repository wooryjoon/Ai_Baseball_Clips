import Header from '@/components/Header';
import { useState } from 'react';
import './MakingVideo.scss';
import ProgressBar from './ProgressBar';
import UploadVideo from './UploadVideo';

export default function MakingVideo() {
    const [isComplete, setIsComplete] = useState(false);
    return (
        <>
            <Header />
            {!isComplete ? <UploadVideo setIsComplete ={setIsComplete}/> : <ProgressBar setIsComplete={setIsComplete}/>}
        </>
    );
}
