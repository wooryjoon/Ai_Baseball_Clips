import Content from '@/components/Content';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Clip } from '../type';
import { ProcessedVideoByInnings } from '@/api/type';
interface VideoCarousel {
    videoList: ProcessedVideoByInnings[];
}
export default function VideoCarousel({ videoList }: VideoCarousel) {
    return (
        <Swiper spaceBetween={10} slidesPerView={2}>
            {videoList.map((clip: ProcessedVideoByInnings) => (
                <SwiperSlide key={clip.batId}>
                    <Content clip={clip} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
