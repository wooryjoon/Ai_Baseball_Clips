import Header from '@/components/Header';
import { useLocation } from 'react-router-dom';
import './MainPage.scss';

export default function MainPage() {
    // 클릭한 것에 따라 스타일 적용하기 위해 설정
    const location = useLocation();
    const current_endUrl = location.pathname.split('/').slice(-1)[0];

    return (
        <>
            <Header />
            <section className="main-container">this is MainPage</section>
        </>
    );
}
