import Content from '@/components/Content';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Clip } from './type';
interface VideoCarousel {
    videoList: Clip[];
}
export default function VideoCarousel({ videoList }: VideoCarousel) {
    return (
        <Swiper spaceBetween={10} slidesPerView={2}>
            {videoList.map((clip: Clip) => (
                <SwiperSlide key={clip.id}>
                    <Content clip={clip} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
