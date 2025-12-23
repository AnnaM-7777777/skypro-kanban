import Card from "../Card/Card";
import {
    SColumn,
    SColumnTitle,
    SColumnTitleP,
    SCards,
    EmptyMessage,
} from "./Column.styled";

export default function Column({ title, cards, onCardClick }) {
    return (
        <SColumn>
            <SColumnTitle>
                <SColumnTitleP>{title}</SColumnTitleP>
            </SColumnTitle>

            <SCards>
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            onClick={() => onCardClick(card)}
                        />
                    ))
                ) : (
                    <EmptyMessage>Нет задач</EmptyMessage>
                )}
            </SCards>
        </SColumn>
    );
}
