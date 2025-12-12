import Card from "../Card/Card.jsx";

export default function Column({ title, cards }) {
    return (
        <div className="main__column column">
            <div className="column__title">
                <p>{title}</p>
            </div>

            <div className="cards">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        category={card.category}
                        title={card.title}
                        date={card.date}
                    />
                ))}
            </div>
        </div>
    );
}
