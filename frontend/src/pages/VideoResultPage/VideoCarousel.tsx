import Content from '@/components/Content';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function VideoCarousel({ url }: any) {
    return (
        <Swiper spaceBetween={10} slidesPerView={2}>
            {url.map((e: string) => (
                <SwiperSlide>
                    <Content url={e} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
