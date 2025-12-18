import Card from "../Card/Card";
import CardLoader from "../CardLoader";

export default function Column({ title, cards, loading, onCardClick }) {
    const filteredCards = cards.filter((card) => card.status === title);

    return (
        <div className="main__column column">
            <div className="column__title">
                <p>{title}</p>
            </div>
            <div className="cards">
                {loading
                    ? Array(3)
                          .fill(null)
                          .map((_, i) => <CardLoader key={i} />)
                    : filteredCards.map((card) => (
                          <Card
                              key={card.id}
                              card={card}
                              onClick={() => onCardClick(card)}
                          />
                      ))}
            </div>
        </div>
    );
}
