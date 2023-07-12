import React, { SetStateAction } from 'react';

const Selector = (
    count: string | number | readonly string[] | undefined,
    setCount: React.SetStateAction<string>,
    onSelectorBtn: (event: React.ChangeEvent<HTMLSelectElement>) => void,
) => {
    // const onSelectorBtn = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setCount(event.target.value);
    // };

    return (
        <select value={count} setCount={setCount} onSelectorBtn={onSelectorBtn}>
            <option value="1">Технологии</option>
            <option value="2">Наука</option>
            <option value="3">Фильмы</option>
            <option value="4">История</option>
        </select>
    );
};

export default Selector;
