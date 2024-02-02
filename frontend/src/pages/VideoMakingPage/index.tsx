import Header from '@/components/Header';
import MakeVideo from './MakeVideo';
import './Video.scss';

export default function MakingVideo() {
    return (
        <>
            <Header />
            <div id="animation-box">애니메이션 공간</div>
            <MakeVideo />
        </>
    );
}
