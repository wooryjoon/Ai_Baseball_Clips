import Button from '@/components/Button';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

export default function Percentage() {
    return (
        <div>
            <Header />
            <div id="percentage">
                <p> AI가 동영상을 추출하고 있어요~ </p>
                {/* 여기에는 동영상 로딩 화면?! */}
                <Link to="/result">
                    <Button styleType="goHighlight">하이라이트 보러가기</Button>
                </Link>
            </div>
        </div>
    );
}
