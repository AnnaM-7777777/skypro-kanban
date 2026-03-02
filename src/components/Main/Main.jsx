import { useState, useCallback } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import { SMain, SMainContent, SMainColumn } from "./Main.styled";

const Main = ({
    columns = [],
    isLoading,
    onDeleteCard,
    onUpdateCard,
    onSaveOrder,
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnd = useCallback(
        (result) => {
            setIsDragging(false);

            // Игнорируем, если бросили вне зоны или идёт загрузка
            if (!result.destination || isLoading) return;

            const { draggableId, source, destination } = result;

            // Находим исходную колонку и карточку
            const sourceColumn = columns.find(
                (col) => col.id === source.droppableId,
            );
            const card = sourceColumn?.cards.find((c) => c.id === draggableId);

            if (!card) return;

            // Если переместили в ДРУГУЮ колонку — обновляем статус на сервере
            if (source.droppableId !== destination.droppableId) {
                onUpdateCard({
                    ...card,
                    status: destination.droppableId,
                });
            }

            // Сохраняем НОВЫЙ порядок для целевой колонки в localStorage
            const destColumn = columns.find(
                (col) => col.id === destination.droppableId,
            );
            if (!destColumn) return;

            // Создаём новый массив карточек целевой колонки
            const newOrder = Array.from(destColumn.cards);

            // Если карточка уже была в этой колонке — удаляем со старого места
            const existingIndex = newOrder.findIndex(
                (c) => c.id === draggableId,
            );
            if (existingIndex !== -1) {
                newOrder.splice(existingIndex, 1);
            }

            // Вставляем карточку на новое место
            newOrder.splice(destination.index, 0, card);

            // Сохраняем только ID в правильном порядке
            onSaveOrder(
                destination.droppableId,
                newOrder.map((c) => c._id),
            );
        },
        [columns, isLoading, onUpdateCard, onSaveOrder],
    );

    return (
        <SMain>
            <DragDropContext
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
            >
                <SMainContent>
                    {columns.map((column) => (
                        <SMainColumn key={column.id}>
                            <Column
                                title={column.title}
                                cards={column.cards}
                                isLoading={isLoading}
                                isDragging={isDragging}
                                onDeleteCard={onDeleteCard}
                                onUpdateCard={onUpdateCard}
                            />
                        </SMainColumn>
                    ))}
                </SMainContent>
            </DragDropContext>
        </SMain>
    );
};

export default Main;
