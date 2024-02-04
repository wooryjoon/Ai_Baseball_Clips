import Header from '@/components/Header';
import './Video.scss';
import UploadVideo from './UploadVideo';

export default function MakingVideo() {
    return (
        <>
            <Header />
            <div id="animation-box">애니메이션 공간</div>
            <UploadVideo />
        </>
    );
}
