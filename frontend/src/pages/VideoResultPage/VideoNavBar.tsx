import MyNavLink from '@/components/Link/MyNavLink';

type Props = {};

export default function VideoNavBar({}: Props) {
    return (
        <nav className="video-navBar">
            <MyNavLink to=".">OverView</MyNavLink>
            <MyNavLink to="./players">선수별</MyNavLink>
            <MyNavLink to="./innings">회차별</MyNavLink>
        </nav>
    );
}
