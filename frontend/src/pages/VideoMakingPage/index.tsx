import Header from '@/components/Header';
import MakeVideo from './MakeVideo';
import './Video.scss';

export default function MakingVideo() {
    return (
        <div>
            <Header />
            <div id="animation-box"></div>
            <MakeVideo />
        </div>
    );
}
