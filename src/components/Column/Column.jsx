/* import Card from "../Card/Card";
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
 */


import Card from "../Card/Card";
import { SColumn, SColumnTitle, SCards, DropZone } from "./Column.styled";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function Column({ title, cards, isLoading, isDragging }) {
    return (
        <SColumn>
            <SColumnTitle>
                <p>{title}</p>
            </SColumnTitle>

            <Droppable droppableId={title} isDropDisabled={isLoading}>
                {(provided) => (
                    <SCards
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {cards.map((card, index) => (
                            <Draggable
                                key={card.id}
                                draggableId={String(card.id)}
                                index={index}
                                isDragDisabled={isLoading || card.isSkeleton}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            minHeight: "130px",
                                        }}
                                    >
                                        <Card
                                            id={card.id}
                                            topic={card.topic}
                                            title={card.title}
                                            date={card.date}
                                            isLoading={isLoading || card.isSkeleton}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        
                        {isDragging && !isLoading && <DropZone />}
                        {provided.placeholder}
                    </SCards>
                )}
            </Droppable>
        </SColumn>
    );
}