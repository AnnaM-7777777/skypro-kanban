import Card from "../Card/Card";
import {
    SColumn,
    SColumnTitle,
    SColumnTitleP,
    SCards,
    EmptyMessage,
} from "./Column.styled";

export default function Column({ title, tasks, onCardClick }) {
    return (
        <SColumn>
            <SColumnTitle>
                <SColumnTitleP>{title}</SColumnTitleP>
            </SColumnTitle>

            <SCards>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Card
                            key={task.id}
                            task={task}
                            onClick={() => onCardClick(task)}
                        />
                    ))
                ) : (
                    <EmptyMessage>Нет задач</EmptyMessage>
                )}
            </SCards>
        </SColumn>
    );
}
