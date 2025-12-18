import Column from "../Column/Column";
import Loader from "../Loader";

export default function Main({ cards, loading, onCardClick }) {
    const columnTitles = [
        "Без статуса",
        "Нужно сделать",
        "В работе",
        "Тестирование",
        "Готово",
    ];

    if (loading) {
        return (
            <main className="main">
                <div className="container">
                    <Loader/>
                </div>
            </main>
        );
    }

    return (
        <main className="main">
            <div className="container">
                <div className="main__block">
                    <div className="main__content">
                        {columnTitles.map((title) => (
                            <Column
                                key={title}
                                title={title}
                                cards={cards}
                                loading={loading}
                                onCardClick={onCardClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
