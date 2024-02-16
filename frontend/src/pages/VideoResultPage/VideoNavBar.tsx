import MyNavLink from '@/components/Link/MyNavLink';
import { memo } from 'react';

type Props = {};

function VideoNavBar({}: Props) {
    return (
        <nav className="video-navBar">
            <MyNavLink to=".">Result</MyNavLink>
            <MyNavLink to="./innings">이닝별</MyNavLink>
            <MyNavLink to="./players">타석별</MyNavLink>
        </nav>
    );
}
export default memo(VideoNavBar);
