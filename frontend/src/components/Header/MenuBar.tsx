import MyNavLink from '../Link/MyNavLink';

export default function MenuBar() {
    return (
        <>
            <nav className="menuBar">
                <MyNavLink to="/makingvideo">동영상 제작</MyNavLink>
                <MyNavLink to="/result">하이라이트</MyNavLink>
                <MyNavLink to="/myPage">나의 정보</MyNavLink>
            </nav>
        </>
    );
}
