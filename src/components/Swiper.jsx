import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, Controller } from 'swiper/modules';

const SwiperProp = ({ count, historyDate }) => {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, Controller]}
                spaceBetween={20}
                slidesPerView={2.5}
                pagination={{ clickable: true }}>
                {historyDate
                    .filter((item) => item.type === count)
                    .map((event) => (
                        <SwiperSlide className="main__scroll__list">
                            <h3>{event.year}</h3>
                            <span>{event.info}</span>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default SwiperProp;
