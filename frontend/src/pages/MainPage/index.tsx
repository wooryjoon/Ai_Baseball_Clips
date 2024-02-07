import Header from '@/components/Header';
import './MainPage.scss';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import IMAGES from '@/images/WelcomImages';
import useScrollFadeIn from '@/hooks/useScrollFadeIn';

export default function MainPage() {
    const animatedImage1 = useScrollFadeIn();
    const animatedImage2 = useScrollFadeIn();
    const animatedImage3 = useScrollFadeIn();

    return (
        <div id="main">
            <Header />
            <div className="main-components">
                <div className="text-box">
                    <p> 야구 동영상을 넣으면 </p>
                    <p> AI가 하이라이트를 제작해줘요</p>
                </div>
                <div className="image-box" {...animatedImage1}>
                    <img src={IMAGES[1]} alt="AI 영상 편집 이미지"></img>
                </div>
                <div className="text-box">
                    <p> 하이라이트가 제작되면 </p>
                    <p> AI가 경기 영상을 분석해줘요</p>
                </div>
                <div className="image-box" {...animatedImage2}>
                    <img src={IMAGES[2]} alt="저장 이미지"></img>
                </div>
                <div className="text-box">
                    <p>나만의 하이라이트를 만들고</p>
                    <p>영상을 저장해보세요</p>
                </div>
                <div className="image-box" {...animatedImage3}>
                    <img src={IMAGES[3]} alt="저장 이미지"></img>
                </div>
                <div className="buttons">
                    <Link to="/makingvideo">
                        <Button styleType="highlight"> 나만의 하이라이트 만들러 가기</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
