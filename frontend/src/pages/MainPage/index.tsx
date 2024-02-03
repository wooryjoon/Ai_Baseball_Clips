import Header from '@/components/Header';
import ProfileBox from './ProfileBox';
import './MainPage.scss';

export default function MainPage() {
    return (
        <div id="main">
            <Header />
            <div id="main-components">
                <ProfileBox />
            </div>
        </div>
    );
}
