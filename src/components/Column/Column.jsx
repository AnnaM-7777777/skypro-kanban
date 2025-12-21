import Card from "../Card/Card";

export default function Column({ title, cards, onCardClick }) {
    return (
        <div className="main__column column">
            <div className="column__title">
                <p>{title}</p>
            </div>

            <div className="cards">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            onClick={() => onCardClick(card)}
                        />
                    ))
                ) : (
                    <div className="cards__empty">Нет задач</div>
                )}
            </div>
        </div>
    );
}
