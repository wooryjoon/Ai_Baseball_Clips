import Header from '@/components/Header';
import './MainPage.scss';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import IMAGES from '@/images/WelcomImages';
import React, { useEffect, useRef, useState } from 'react';
import useScrollFadeIn from '@/hooks/useScrollFadeIn';

export default function MainPage() {
    const fadeInProps = useScrollFadeIn({ direction: 'up', duration: 1, delay: 0.5 });

    return (
        <div id="main">
            <Header />
            <div id="main-components">
                <div className="text-box" ref={fadeInProps.ref} style={fadeInProps.style}>
                    <p> 야구 동영상을 넣으면 </p>
                    <p> AI가 하이라이트로 만들어줘요</p>
                </div>
                <div className="image-box">
                    <img src={IMAGES[1]} alt="AI 영상 편집 이미지"></img>
                </div>
                <div className="text-box">
                    <p>나만의 하이라이트를 만들고</p>
                    <p>영상을 저장해보세요</p>
                </div>
                <div className="image-box">
                    <img src={IMAGES[2]} alt="저장 이미지"></img>
                </div>
                <Link to="/makingvideo">
                    <Button styleType="highlight"> 나만의 하이라이트 만들러 가기</Button>
                </Link>
            </div>
        </div>
    );
}
