import { useMemo, useCallback } from "react";
import { useTasks } from "./useTasks";
import { useAuth } from "./useAuth";

export const STATUSES = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
];

export const useKanban = () => {
    const { tasks, isLoading, error, editTask, removeTask } = useTasks();
    const { user } = useAuth();

    // Ключ для localStorage (уникальный для каждого пользователя)
    const storageKey = `kanban-order-${user?._id || "guest"}`;

    // Вспомогательные функции для работы с localStorage
    const loadOrderMap = useCallback(() => {
        try {
            return JSON.parse(localStorage.getItem(storageKey)) || {};
        } catch {
            return {};
        }
    }, [storageKey]);

    const saveOrderMap = useCallback(
        (map) => {
            try {
                localStorage.setItem(storageKey, JSON.stringify(map));
            } catch (e) {
                console.error("Failed to save order to localStorage:", e);
            }
        },
        [storageKey],
    );

    // Группировка + сортировка задач (мемоизируется)
    const groupedColumns = useMemo(() => {
        const orderMap = loadOrderMap();
        const grouped = {};

        // 1. Инициализируем все колонки (даже пустые)
        STATUSES.forEach((status) => {
            grouped[status] = [];
        });

        // 2. Распределяем задачи по статусам
        tasks.forEach((task) => {
            const status = task.status || "Без статуса";
            if (!grouped[status]) grouped[status] = [];

            grouped[status].push({
                id: task._id,
                _id: task._id,
                topic: task.topic,
                title: task.title,
                date: task.date,
                status,
                description: task.description,
            });
        });

        // 3. Сортируем каждую колонку по сохранённому порядку
        Object.keys(grouped).forEach((status) => {
            const savedOrder = orderMap[status];
            if (savedOrder?.length > 0) {
                grouped[status].sort((a, b) => {
                    const indexA = savedOrder.indexOf(a._id);
                    const indexB = savedOrder.indexOf(b._id);
                    // Если карточки нет в сохранённом порядке — в конец
                    if (indexA === -1) return 1;
                    if (indexB === -1) return -1;
                    return indexA - indexB;
                });
            }
        });

        return grouped;
    }, [tasks, loadOrderMap]);

    // Преобразуем в формат колонок для передачи в Main
    const columns = useMemo(() => {
        return STATUSES.map((status) => ({
            id: status,
            title: status,
            cards: groupedColumns[status] || [],
        }));
    }, [groupedColumns]);

    // Удаление задачи + очистка из localStorage
    const handleDeleteCard = useCallback(
        async (id) => {
            await removeTask(id);

            const map = loadOrderMap();
            Object.keys(map).forEach((status) => {
                map[status] = map[status].filter((cardId) => cardId !== id);
            });
            saveOrderMap(map);
        },
        [removeTask, loadOrderMap, saveOrderMap],
    );

    // Обновление задачи (только данные, не порядок)
    const handleUpdateCard = useCallback(
        async (updated) => {
            await editTask(updated._id, {
                title: updated.title,
                topic: updated.topic,
                status: updated.status,
                description: updated.description,
                date: updated.date,
            });
        },
        [editTask],
    );

    // Сохранение нового порядка для одной колонки
    const handleSaveOrder = useCallback(
        (status, cardIds) => {
            const map = loadOrderMap();
            map[status] = cardIds;
            saveOrderMap(map);
        },
        [loadOrderMap, saveOrderMap],
    );

    return {
        columns,
        isLoading,
        error,
        onDeleteCard: handleDeleteCard,
        onUpdateCard: handleUpdateCard,
        onSaveOrder: handleSaveOrder,
    };
};
