import ProfileWidget from './ProfileWidget';
import Logo from './Logo';
import './Header.scss';
export default function Header() {
    // dialog 태그에 접근하기 위해 useRef 사용

    return (
        <header>
            <Logo />
            <ProfileWidget />
        </header>
    );
}
