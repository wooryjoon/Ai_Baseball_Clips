import { Link } from 'react-router-dom';
import './Landing.scss';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useSelector } from 'react-redux';

export default function LandingPage() {
    return (
        <>
            <Header />
            <div id="start">
                <p className="description">Get Started!</p>
                <Link to="/login">
                    <Button styleType="login">로그인</Button>
                </Link>
                <Link to="/signup">
                    <Button styleType="signup">회원가입</Button>
                </Link>
            </div>
        </>
    );
}
