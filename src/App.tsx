import React, { useEffect, useState } from 'react';
import './App.scss';
import 'swiper/css/bundle';
import { gsap } from 'gsap';
import Radius from './components/Radius';
import axios from 'axios';
import { types } from './lib/info';
import SwiperProp from './components/Swiper';
import Selector from './components/Selector';

function App(): JSX.Element {
    const [count, setCount] = useState<string['1']>('1');
    const [historyDate, setHistoryDate] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetching, setFetching] = useState(true);

    const onClickBtn = (event: React.ChangeEvent<HTMLButtonElement>) => {
        setCount(event.target.value);
    };
    const onSelectorBtn = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCount(event.target.value);
    };

    gsap.to('.main__history', {
        x: -250,

        duration: 2,
    });

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
                                value={i + 1}
                                onChange={onClickBtn}>
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
                                    .filter((item: any) => item.type === count)
                                    .filter((item: any) => item.start === '1')
                                    .map((event: any) => (
                                        <span>{event.year}</span>
                                    ))}
                            </div>

                            <div className="main__date__count">
                                <h4>
                                    {count} / {types.length}
                                </h4>
                                <Selector
                                    count={count}
                                    setCount={setCount}
                                    onSelectorBtn={onSelectorBtn}
                                />
                                {/* <select value={count} onChange={onSelectorBtn}>
                                    <option value="1">Технологии</option>
                                    <option value="2">Наука</option>
                                    <option value="3">Фильмы</option>
                                    <option value="4">История</option>
                                </select> */}
                            </div>
                        </div>
                        <div className="main__scroll">
                            <SwiperProp historyDate={historyDate} count={count} />
                        </div>
                        <div className="main__scroll__mob">
                            <SwiperProp historyDate={historyDate} count={count} />
                            <div className="main__scroll__mob-count">
                                <h4>
                                    {count} / {types.length}
                                </h4>
                                {/* <select value={count} onChange={onSelectorBtn}>
                                    <option value="1">Технологии</option>
                                    <option value="2">Наука</option>
                                    <option value="3">Фильмы</option>
                                    <option value="4">История</option>
                                </select> */}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
