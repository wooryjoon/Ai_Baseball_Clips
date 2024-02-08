import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

type InningDropDown = {
    onClick?: () => void;
};

export default function InningDropDown({}: InningDropDown) {
    const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [isShow, setIsShow] = useState<boolean>(false);
    const onClickShowHandler = () => {
        setIsShow(!isShow);
    };
    // 이닝 선택 시 onClick 함수에 따라 데이터 요청, isShow false처리
    // 클릭 시
    return (
        <>
            <div className="scoreboard-container-inning">
                <div className="scoreboard-inning" onClick={onClickShowHandler}>
                    3회
                </div>
            </div>
            {isShow && (
                <div className="dropdown">
                    <Swiper spaceBetween={10} slidesPerView={5}>
                        {mockData.map((i) => (
                            <SwiperSlide key={''}>
                                <span>{`${i}회`}</span>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}
