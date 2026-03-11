import { useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo, useState, useEffect } from "react";
import { useTheme } from "styled-components";
import Calendar from "../Calendar/Calendar";
import { TaskContext } from "../../context/TaskContext";
import { toast } from "react-toastify";
import { getCategoryColors } from "../../utils/getCategoryColors";

const STATUSES = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
];

function PopBrowse() {
    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();
    const { tasks, editTask, removeTask } = useContext(TaskContext);

    const task = useMemo(() => {
        return (
            tasks.find((t) => String(t._id) === id || String(t.id) === id) ||
            null
        );
    }, [tasks, id]);

    const [isEdit, setIsEdit] = useState(false);
    const [draft, setDraft] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkTheme] = useState(
        () => localStorage.getItem("theme") === "dark",
    );

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    useEffect(() => {
        if (task) {
            const timeout = setTimeout(() => {
                setDraft({
                    ...task,
                    description: task.description?.trim() || "", // ← Обрезаем пробелы
                });
            }, 0);
            return () => clearTimeout(timeout);
        }
    }, [task]);

    const handleClose = () => navigate(-1);

    const handleDelete = async () => {
        if (!task) return;
        setIsLoading(true);
        const success = await removeTask(task._id || task.id);
        setIsLoading(false);

        if (success) {
            toast.success("Задача удалена");
            navigate(-1);
        } else {
            toast.error("Не удалось удалить задачу");
        }
    };

    const handleSave = async () => {
        if (!draft) return;

        let hasError = false;
        if (!draft.title.trim()) {
            setTitleError(true);
            hasError = true;
        } else setTitleError(false);

        if (!draft.description.trim()) {
            setDescriptionError(true);
            hasError = true;
        } else setDescriptionError(false);

        if (hasError) {
            toast.error("Пожалуйста, заполните обязательные поля");
            return;
        }

        setIsLoading(true);
        try {
            const success = await editTask(task._id || task.id, {
                ...draft,
                title: draft.title.trim(),
                description: draft.description.trim(),
                status: draft.status,
            });

            if (success) {
                toast.success("Задача сохранена");
                setIsEdit(false);
            } else {
                toast.error("Не удалось сохранить задачу");
            }
        } catch (err) {
            toast.error(err || "Ошибка сервера при сохранении задачи");
        } finally {
            setIsLoading(false);
        }
    };

    /* const handleCancel = () => {
        setDraft({ ...task });
        setIsEdit(false);
        setTitleError(false);
        setDescriptionError(false);
    }; */

    const handleCancel = () => {
        setDraft({
            ...task,
            description: task.description?.trim() || "",
        });
        setIsEdit(false);
        setTitleError(false);
        setDescriptionError(false);
    };

    if (!task || !draft) return null;

    const category = draft.topic || "Other";

    // Получаем цвета категории через утилиту
    const categoryColors = getCategoryColors(category, theme.mode);

    return (
        <div className="pop-browse">
            <div className="pop-browse__container">
                <div
                    className={`pop-browse__block ${isDarkTheme ? "dark-mode" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="pop-browse__content">
                        <div className="pop-browse__category">
                            <h3
                                className={`pop-browse__category-title ${titleError ? "_error" : ""}`}
                            >
                                {draft.title || "Без названия"}
                            </h3>

                            {/* активен - скрыт в мобильной версии (495px) */}
                            <div
                                className="pop-browse__category-theme theme-category _active-category"
                                style={{
                                    backgroundColor: categoryColors.bg,
                                    color: categoryColors.text,
                                }}
                            >
                                <p>{category}</p>
                            </div>
                        </div>

                        <div className="pop-browse__status status">
                            <p className="pop-browse__status-title subttl">
                                Статус
                            </p>

                            <div className="pop-browse__status-themes">
                                {isEdit ? (
                                    // Режим редактирования: показываем ВСЕ статусы
                                    STATUSES.map((status) => (
                                        <div
                                            key={status}
                                            className={`pop-browse__status-theme ${
                                                draft.status === status
                                                    ? "_active"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                if (isEdit) {
                                                    setDraft({
                                                        ...draft,
                                                        status,
                                                    });
                                                }
                                            }}
                                            style={{
                                                cursor: isEdit
                                                    ? "pointer"
                                                    : "default",
                                                opacity: isEdit ? 1 : 0.7,
                                            }}
                                        >
                                            <p>{status}</p>
                                        </div>
                                    ))
                                ) : (
                                    // Режим просмотра: показываем только активный статус
                                    <div className="pop-browse__status-theme _active">
                                        <p>{draft.status}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pop-browse__description">
                            <form className="pop-browse__description-form">
                                <label className="subttl">
                                    Описание задачи
                                </label>

                                <textarea
                                    className={`pop-browse__description-form-area ${descriptionError ? "_error" : ""} ${isEdit ? "_edit-mode" : "_view-mode"}`}
                                    readOnly={!isEdit}
                                    value={draft.description || ""}
                                    onChange={(e) =>
                                        setDraft({
                                            ...draft,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder={
                                        isEdit
                                            ? "Введите описание задачи..."
                                            : "Описание задачи"
                                    }
                                />
                            </form>

                            <div className="pop-browse__calendar">
                                <Calendar
                                    date={draft.date}
                                    variant="full"
                                    onChange={(newDate) =>
                                        setDraft({ ...draft, date: newDate })
                                    }
                                />
                            </div>

                            {/* скрыт - активен в мобильной версии (495px) */}
                            <div className="pop-browse__category-theme-block-mobile">
                                <p className="pop-browse__status-title subttl">
                                    Категория
                                </p>

                                <div
                                    className="pop-browse__category-theme-mobile theme-category _active-category"
                                    style={{
                                        backgroundColor: categoryColors.bg,
                                        color: categoryColors.text,
                                    }}
                                >
                                    <p>{category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pop-browse__btn-block">
                            {isEdit ? (
                                <>
                                    <button
                                        className={`pop-browse__btn-save ${isEdit ? "_edit-mode" : "_view-mode"} ${isLoading ? "_loading" : ""}`}
                                        onClick={handleSave}
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Сохранение..."
                                            : "Сохранить"}
                                    </button>

                                    <button
                                        className={`pop-browse__btn-cancel ${isEdit ? "_edit-mode" : "_view-mode"} ${isLoading ? "_loading" : ""}`}
                                        onClick={handleCancel}
                                        disabled={isLoading}
                                    >
                                        Отменить
                                    </button>

                                    <button
                                        className={`pop-browse__btn-delete ${isEdit ? "_edit-mode" : "_view-mode"} ${isLoading ? "_loading" : ""}`}
                                        onClick={handleDelete}
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Удаление..."
                                            : "Удалить задачу"}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className={`pop-browse__btn-edit ${isEdit ? "_edit-mode" : "_view-mode"} ${isLoading ? "_loading" : ""}`}
                                        onClick={() => setIsEdit(true)}
                                        disabled={isLoading}
                                    >
                                        Редактировать задачу
                                    </button>

                                    <button
                                        className={`pop-browse__btn-delete ${isEdit ? "_edit-mode" : "_view-mode"} ${isLoading ? "_loading" : ""}`}
                                        onClick={handleDelete}
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Удаление..."
                                            : "Удалить задачу"}
                                    </button>
                                </>
                            )}

                            <button
                                className={`pop-browse__btn-close ${isLoading ? "_loading" : ""}`}
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopBrowse;
