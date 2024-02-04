import Button from '@/components/Button';
import Header from '@/components/Header';
import ProfileBox from './ProfileBox';
import { Link } from 'react-router-dom';
import './MainPage.scss';

export default function Test() {
    return (
        <div id="main">
            <Header />
            <div id="main-components">
                <Link to="">
                    <Button styleType="highlight"> 나만의 하이라이트 만들러 가기</Button>
                </Link>
                <ProfileBox />
            </div>
        </div>
    );
}
