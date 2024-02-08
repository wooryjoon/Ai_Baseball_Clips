import Button from '@/components/Button';
import Header from '@/components/Header';
// import ProfileBox from './ProfileBox';
import { Link } from 'react-router-dom';
import './MainPage.scss';

export default function Welcome() {
    return (
        <div id="main">
            <Header />
            <div id="main-components">
                {/* <ProfileBox /> */}
                <div className="likedVideo">
                    <p>nickname 님의 동영상</p>
                    <div className="videoBox">
                        <video>{/* 찜한 동영상 일부 */}</video>
                    </div>
                    <Link to="myvideo">
                        <Button styleType="more">더 보러 가기</Button>
                    </Link>
                </div>
                <div className="today-highlight">
                    {/* 오늘 만든 하이라이트 영상 페이지 */}
                    <p> 오늘의 하이라이트 </p>
                    {/* 만약 오늘 만든 하이라이트가 없다면 블러 처리 + 만들러 가기*/}
                    {/* 오늘 만든 하이라이트가 있다면 보여주기 (일부)*/}
                    <div className="videoBox">
                        <video></video>
                    </div>

                    {/* <Link to="/makingvideo">
                        <Button styleType="highlight">나만의 하이라이트 만들러 가기</Button>
                    </Link> */}
                    <Link to="/result">
                        <Button styleType="more"> 더 보러 가기 </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
