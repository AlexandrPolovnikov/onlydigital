const Selector = ({
    count,
    setCount,
    onSelectorBtn,
}: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    onSelectorBtn: (value: number) => void;
}) => {
    // const onSelectorBtn = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setCount(event.target.value);
    // };

    return (
        <select
            value={count}
            onChange={() => {
                console.log('ON-CHANGE' + { count });
                onSelectorBtn(count);
            }}>
            <option value={1}>Технологии</option>
            <option value={2}>Наука</option>
            <option value={3}>Фильмы</option>
            <option value={4}>История</option>
        </select>
    );
};

export default Selector;
