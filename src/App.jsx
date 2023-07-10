import React, { useEffect, useState } from 'react';
import './App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller, Mousewheel } from 'swiper/modules';
import 'swiper/css/bundle';
import { gsap } from 'gsap';
import Radius from './components/Radius';
import axios from 'axios';
import { types } from './lib/info';

function App() {
    const [count, setCount] = useState('1');
    const [historyDate, setHistoryDate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetching, setFetching] = useState(true);

    gsap.to(
        '.main__history',
        {
            x: -250,

            duration: 2,
        },
        { x: 0, duration: 1 },
    );

    useEffect(() => {
        if (fetching) {
            setIsLoading(true);
            axios
                .get(`http://localhost:3000/historyDate`)
                .then((response) => {
                    setHistoryDate([...historyDate, ...response.data]);
                    setIsLoading(false);
                })
                .finally(() => setFetching(false));
        }
    }, [fetching]);

    return (
        <div className="App">
            <div className="container">
                <div className="types">
                    {types.map((e, i) => (
                        <div className="types__style">
                            <button
                                className="types__style__btn"
                                text={i}
                                value={i + 1}
                                onClick={(e) => setCount(e.target.value)}>
                                {i + 1}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="container__border"></div>
                <div className="container__border"></div>
                <div className="container__border"></div>
                <div className="container__border"></div>
                <div className="container__radius">
                    <Radius />
                </div>
                <div className="container__radius__min"></div>
            </div>
            <div className="main">
                {isLoading ? (
                    <h1 className="title">Loading...</h1>
                ) : (
                    <>
                        <div className="main__history">
                            <span>
                                Исторические <br /> даты
                            </span>
                        </div>

                        <div className="">
                            <div className="main__date">
                                {historyDate
                                    .filter((item) => item.type === count)
                                    .filter((item) => item.start === '1')
                                    .map((event, i) => (
                                        <span>{event.year}</span>
                                    ))}
                            </div>

                            <div className="main__date__count">
                                <h4>
                                    {count} / {types.length}
                                </h4>
                                <select value={count} onChange={(e) => setCount(e.target.value)}>
                                    <option value="1">Технологии</option>
                                    <option value="2">Наука</option>
                                    <option value="3">Фильмы</option>
                                    <option value="4">История</option>
                                </select>
                            </div>
                        </div>
                        <div className="main__scroll">
                            <Swiper
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Scrollbar,
                                    A11y,
                                    Mousewheel,
                                    Controller,
                                ]}
                                spaceBetween={40}
                                slidesPerView={3.5}>
                                {historyDate
                                    .filter((item) => item.type === count)
                                    .map((event, i) => (
                                        <SwiperSlide className="main__scroll__list">
                                            <h3>{event.year}</h3>
                                            <span>{event.info}</span>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                        <div className="main__scroll__mob">
                            <Swiper
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Scrollbar,
                                    A11y,
                                    Mousewheel,
                                    Controller,
                                ]}
                                spaceBetween={20}
                                slidesPerView={2.5}
                                pagination={{ clickable: true }}>
                                {historyDate
                                    .filter((item) => item.type === count)
                                    .map((event, i) => (
                                        <SwiperSlide className="main__scroll__list">
                                            <h3>{event.year}</h3>
                                            <span>{event.info}</span>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                            <div className="main__scroll__mob-count">
                                <h4>
                                    {count} / {types.length}
                                </h4>
                                <select value={count} onChange={(e) => setCount(e.target.value)}>
                                    <option value="1">Технологии</option>
                                    <option value="2">Наука</option>
                                    <option value="3">Фильмы</option>
                                    <option value="4">История</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
