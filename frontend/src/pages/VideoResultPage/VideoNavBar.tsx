import MyNavLink from '@/components/Link/MyNavLink';

type Props = {};

export default function VideoNavBar({}: Props) {
    return (
        <nav className="video-navBar">
            <MyNavLink to="./players">선수별</MyNavLink>
            <MyNavLink to="./innings">회차별</MyNavLink>
            <MyNavLink to="./teams">구단별</MyNavLink>
        </nav>
    );
}
