import Column from "../Column/Column";
import Loader from "../Loader";

export default function Main({ columns, loading, onCardClick }) {
    if (loading) {
        return (
            <main className="main">
                <div className="container">
                    <Loader />
                </div>
            </main>
        );
    }

    return (
        <main className="main">
            <div className="container">
                <div className="main__block">
                    <div className="main__content">
                        {columns.map((col) => (
                            <Column
                                key={col.id}
                                title={col.title}
                                cards={col.cards} // ← уже отфильтрованные!
                                onCardClick={onCardClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
