import { memo } from 'react';
import MyNavLink from '../Link/MyNavLink';

function MenuBar() {
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
export default memo(MenuBar);
