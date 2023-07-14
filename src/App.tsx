import React, { useEffect, useState } from 'react';
import './App.scss';
import 'swiper/css/bundle';
import { gsap } from 'gsap';
import Radius from './components/Radius';
import axios from 'axios';
import { types } from './lib/info';
import SwiperProp from './components/Swiper';
import Button from './components/Button';
import { COLOR_TYPES, ICON_NAMES } from './lib/constants.enum';

function App(): JSX.Element {
    const [count, setCount] = useState<any>(1);
    const [historyDate, setHistoryDate] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetching, setFetching] = useState(true);

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

    const onSelectorBtn = (event: number) => {
        setCount(event);
        console.log(event);
    };

    gsap.to('.main__history', {
        x: -250,

        duration: 2,
    });

    return (
        <div className="App">
            <div className="container">
                <div className="types">
                    {types.map((e, i) => (
                        <div className="types__style">
                            <Button
                                text={i + 1}
                                className="info"
                                value={e.name}
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
                            <div className="main__date__count">
                                <h4>
                                    {count} / {types.length}
                                </h4>
                                <div>
                                    <Button
                                        className="default"
                                        text="&#x21D0;"
                                        type={COLOR_TYPES.danger}
                                        value={count - 1}
                                        onClick={() =>
                                            onSelectorBtn(count > 1 ? count - 1 : count + 0)
                                        }
                                    />
                                    <Button
                                        className="default"
                                        text="&#x21D2;"
                                        type={COLOR_TYPES.danger}
                                        value={count + 1}
                                        onClick={() =>
                                            onSelectorBtn(count < 4 ? count + 1 : count + 0)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="main__date">
                                <div className="main__date-span">
                                    {historyDate
                                        .filter((item: any) => item.type === count)
                                        .filter((item: any) => item.start === '1')
                                        .map((event: any) => (
                                            <span>{event.year}</span>
                                        ))}
                                </div>
                            </div>
                            <div className="main__date__count"></div>
                        </div>
                        <div className="main__scroll">
                            <SwiperProp historyDate={historyDate} count={count} />
                        </div>
                        <div className="main__scroll__mob">
                            <SwiperProp historyDate={historyDate} count={count} />
                            <div className="main__scroll__mob-count">
                                <div>
                                    <h4>
                                        {count} / {types.length}
                                    </h4>
                                </div>
                                <div>
                                    <Button
                                        text="&#x21D0;"
                                        className="default"
                                        type={COLOR_TYPES.danger}
                                        onClick={() =>
                                            onSelectorBtn(count > 1 ? count - 1 : count + 0)
                                        }
                                    />
                                    <Button
                                        className="default"
                                        type={COLOR_TYPES.danger}
                                        text="&#x21D2;"
                                        onClick={() =>
                                            onSelectorBtn(count < 4 ? count + 1 : count + 0)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
