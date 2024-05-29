import React, { useState, useEffect } from 'react';

interface Data {
    name: string;
    id: string;
    image: string;
    tags: string[];
    bgColor: string;
}

const App: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [filterData, setFilterData] = useState<Data[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://logiclike.com/docs/courses.json')
            .then((response) => response.json())
            .then((data: Data[]) => {
                setData(data);
                createTagsArray(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const createTagsArray = (data: Data[]) => {
        const tagsArray: string[] = [];
        data.forEach((item) => {
            tagsArray.push(...item.tags);
        });
        const uniqueTags = [...new Set(tagsArray)];
        setTags(['Все темы', ...uniqueTags]);
    };

    const handleClick = (btn: string) => {
        if (btn === 'Все темы') {
            setFilterData(data);
        } else {
            const filteredData = data.filter((item) => item.tags.includes(btn));
            setFilterData(filteredData);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <aside>
                    {tags.map((btn, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                handleClick(btn);
                            }}
                        >
                            {btn}
                        </button>
                    ))}
                </aside>
                <section>
                    {filterData.map((item) => (
                        <div
                            style={{
                                backgroundColor: item.bgColor,
                            }}
                            key={item.id}
                        >
                            <img src={item.image} alt="LogicLike" />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default App;
