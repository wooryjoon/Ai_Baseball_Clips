import ProfileWidget from './ProfileWidget';
import Logo from './Logo';
import './Header.scss';
import MenuBar from './MenuBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {
    // dialog 태그에 접근하기 위해 useRef 사용
    const isLogin = useSelector((state: any) => state.auth.isAuth);
    return (
        <>
            <header>
                <Logo />
                {isLogin ? <ProfileWidget /> : <Link to="/signup">회원가입</Link>}
            </header>
            {isLogin && <MenuBar />}
        </>
    );
}
