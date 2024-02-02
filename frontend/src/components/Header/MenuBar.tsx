import { Link } from 'react-router-dom';

export default function MenuBar() {
    return (
        <>
            <nav className="menuBar">
                <Link to="/makingvideo">동영상 제작</Link>
                <Link to="/result">하이라이트</Link>
                <Link to="/myPage">나의 정보</Link>
            </nav>
        </>
    );
}
