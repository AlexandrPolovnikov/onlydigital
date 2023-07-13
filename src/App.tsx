import React, { useEffect, useState } from 'react';
import './App.scss';
import 'swiper/css/bundle';
import { gsap } from 'gsap';
import Radius from './components/Radius';
import axios from 'axios';
import { types } from './lib/info';
import SwiperProp from './components/Swiper';
import Button from './components/Button';

function App(): JSX.Element {
    const [count, setCount] = useState<any>(1);
    const [historyDate, setHistoryDate] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetching, setFetching] = useState(true);

    const onSelectorBtn = (event: number) => {
        setCount(event);
        console.log(event);
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
    }, [fetching, historyDate]);

    return (
        <div className="App">
            <div className="container">
                <div className="types">
                    {types.map((e, i) => (
                        <div className="types__style">
                            <Button
                                text={i + 1}
                                className="types__style__btn"
                                value={i + 1}
                                onClick={() => onSelectorBtn(i + 1)}
                            />
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

                        <div className="main__center">
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
                                <Button
                                    className="info"
                                    text="&#x21D0;"
                                    value={count - 1}
                                    onClick={() => onSelectorBtn(count > 1 ? count - 1 : count + 0)}
                                />
                                <Button
                                    className="info"
                                    value={count + 1}
                                    onClick={() =>
                                        onSelectorBtn(count <= 3 ? count + 1 : count + 0)
                                    }
                                    text="&#x21D2;"
                                />
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
                                <Button
                                    text="&#x21D0;"
                                    className="info"
                                    value={count - 1}
                                    onClick={() => onSelectorBtn(count > 1 ? count - 1 : count + 0)}
                                />
                                <Button
                                    value={count + 1}
                                    className="info"
                                    onClick={() =>
                                        onSelectorBtn(count <= 3 ? count + 1 : count + 0)
                                    }
                                    text="&#x21D2;"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
