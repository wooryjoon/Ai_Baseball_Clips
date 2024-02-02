import { Link, Outlet } from "react-router-dom";
import './test.scss';

export default function MenuBar() {

    return (
        <div>
            <nav className="header-menuBar">
                <Link to="/makingvideo">동영상 제작</Link>
                <Link to="/result">하이라이트</Link>
                <Link to="/myPage">나의 정보</Link>
            </nav>
            <section>
                <Outlet></Outlet>
            </section>
        </div>
    );
}

