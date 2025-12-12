import Column from "../Column/Column.jsx";

const columnsData = [
    {
        title: "Без статуса",
        cards: [
            {
                category: "Web Design",
                title: "Название задачи",
                date: "30.10.23",
            },
            {
                category: "Research",
                title: "Название задачи",
                date: "30.10.23",
            },
            // ... остальные карточки
        ],
    },
    {
        title: "Нужно сделать",
        cards: [
            {
                category: "Research",
                title: "Название задачи",
                date: "30.10.23",
            },
        ],
    },
    {
        title: "В работе",
        cards: [
            {
                category: "Research",
                title: "Название задачи",
                date: "30.10.23",
            },
            {
                category: "Copywriting",
                title: "Название задачи",
                date: "30.10.23",
            },
        ],
    },
    {
        title: "Тестирование",
        cards: [
            {
                category: "Research",
                title: "Название задачи",
                date: "30.10.23",
            },
        ],
    },
    {
        title: "Готово",
        cards: [
            {
                category: "Research",
                title: "Название задачи",
                date: "30.10.23",
            },
        ],
    },
];

const Main = () => {
    return (
        <main className="main">
            <div className="container">
                <div className="main__block">
                    <div className="main__content">
                        {columnsData.map((col, idx) => (
                            <Column
                                key={idx}
                                title={col.title}
                                cards={col.cards}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
