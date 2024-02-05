import Header from '@/components/Header';
import './MainPage.scss';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import IMAGES from '@/images/WelcomImages';
import React from 'react';
import useScrollFadeIn from '@/hooks/useScrollFadeIn';

export default function MainPage() {
    const animatedItem = useScrollFadeIn();

    return (
        <div id="main">
            <Header />
            <div id="main-components">
                <div className="text-box">
                    <p> 야구 동영상을 넣으면 </p>
                    <p> AI가 하이라이트로 만들어줘요</p>
                </div>
                <img src={IMAGES[1]} alt="AI 영상 편집 이미지" className="image-box"></img>
                <div className="text-box">
                    <p>나만의 하이라이트를 만들고</p>
                    <p>영상을 저장해보세요</p>
                </div>
                <img src={IMAGES[2]} alt="저장 이미지" className="image-box"></img>
                <Link to="/makingvideo">
                    <Button styleType="highlight"> 나만의 하이라이트 만들러 가기</Button>
                </Link>
            </div>
        </div>
    );
}
