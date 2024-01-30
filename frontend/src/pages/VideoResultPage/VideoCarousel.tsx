import Video from '@/components/Video';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function VideoCarousel({ url }: any) {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={2}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {url.map(() => (
                <SwiperSlide>
                    <Video />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

// {url.map((link: string) => {
//     return <Video src={link} />;
// })}
