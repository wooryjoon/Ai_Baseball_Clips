import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type InningDropDown = {
    onClick: (inning: number) => void;
    inning: number;
};

export default function InningDropDown({ onClick, inning }: InningDropDown) {
    const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [isShow, setIsShow] = useState<boolean>(false);
    const onClickShowHandler = () => {
        setIsShow(!isShow);
    };

    return (
        <>
            <div className="scoreboard-container-inning">
                <div className="scoreboard-inning" onClick={onClickShowHandler}>
                    {inning}회
                </div>
            </div>
            {isShow && (
                <div className="dropdown">
                    <Swiper spaceBetween={10} slidesPerView={5}>
                        {mockData.map((inning) => (
                            <SwiperSlide key={inning}>
                                <span
                                    onClick={() => {
                                        onClick(inning);
                                        // dropdown창 닫아버리기
                                        onClickShowHandler();
                                    }}
                                >{`${inning}회`}</span>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}
