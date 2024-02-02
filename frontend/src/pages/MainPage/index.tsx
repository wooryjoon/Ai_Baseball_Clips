import Header from '@/components/Header';
import {Link, Outlet, useLocation} from 'react-router-dom';
import './MainPage.scss';

export default function MainPage(){
    // 클릭한 것에 따라 스타일 적용하기 위해 설정
    const location = useLocation();
    const current_endUrl = location.pathname.split('/').slice(-1)[0];

    return(
        <section id="main-container">
            <Header />
            <nav className="main-navBar">
                <Link to="./makingvideo" > 동영상 제작 </Link>
                <Link to="./result" > 하이라이트 </Link>
                <Link to="./mypage" > 마이 페이지 </Link>
            </nav>
            <section id='menu'>
                <Outlet></Outlet>
            </section>
        </section>
    );
}