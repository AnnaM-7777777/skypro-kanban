import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Calendar from "../Calendar/Calendar";
import { useTasks } from "../../hooks/useTasks";
import { toast } from "react-toastify";

const CATEGORY_MAP = {
    "Web Design": "_orange",
    Research: "_green",
    Copywriting: "_purple",
};

function PopNewCard() {
    const navigate = useNavigate();
    const { addTask } = useTasks();
    const abortControllerRef = useRef(null); // Для отмены запроса

    const [isDarkTheme] = useState(
        () => localStorage.getItem("theme") === "dark",
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("Research");
    const [date, setDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => navigate(-1);

    // Очистка при размонтировании
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (isLoading) return; // Защита от двойного клика

        setIsLoading(true);

        try {
            // Валидация
            if (!title.trim()) {
                toast.warning("Введите название задачи");
                setIsLoading(false);
                return;
            }

            const taskData = {
                title: title.trim() || "Новая задача",
                topic: topic || "Research",
                status: "Без статуса",
                description: description.trim() || " ",
                date: date
                    ? new Date(date).toISOString()
                    : new Date().toISOString(),
            };

            // Передаем сигнал отмены, если ваш addTask поддерживает AbortSignal
            // Если нет, просто ждем промис
            const success = await addTask(taskData);

            if (success) {
                toast.success("Задача успешно создана!");
                navigate(-1);
            } else {
                // Если addTask возвращает false, но не кидает ошибку
                toast.error("Не удалось создать задачу (ответ сервера)");
            }
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Запрос отменен");
                return;
            }
            console.error(err);
            toast.error(err.message || "Ошибка сервера при создании задачи");
        } finally {
            // Сбрасываем загрузку только если запрос не был отменен
            if (abortControllerRef.current?.signal.aborted === false) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="pop-new-card" id="popNewCard">
            <div className="pop-new-card__container" onClick={handleClose}>
                <div
                    className={`pop-new-card__form-block ${isDarkTheme ? "dark-mode" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="pop-new-card__content">
                        <h3 className="pop-new-card__title">Создание задачи</h3>

                        <div className="pop-new-card__wrap">
                            <form className="pop-new-card__form form-new">
                                <div className="pop-new-card__form-description">
                                    <label
                                        htmlFor="formTitle"
                                        className="subttl"
                                    >
                                        Название задачи
                                    </label>

                                    <input
                                        className="pop-new-card__form-input"
                                        type="text"
                                        id="formTitle"
                                        placeholder="Введите название задачи..."
                                        autoFocus
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="pop-new-card__form-description">
                                    <label
                                        htmlFor="textArea"
                                        className="subttl"
                                    >
                                        Описание задачи
                                    </label>

                                    <textarea
                                        className="pop-new-card__form-area"
                                        id="textArea"
                                        placeholder="Введите описание задачи..."
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                            </form>

                            <div className="pop-new-card__calendar">
                                <Calendar
                                    date={date}
                                    variant="full"
                                    onChange={setDate}
                                />
                            </div>
                        </div>

                        <div className="pop-new-card__category">
                            <p className="pop-new-card__category-title subttl">
                                Категория
                            </p>

                            <div className="pop-new-card__category-themes">
                                {Object.keys(CATEGORY_MAP).map((cat) => (
                                    <div
                                        key={cat}
                                        className={`pop-browse__category-theme pop-new-card__category-theme ${CATEGORY_MAP[cat]} ${
                                            topic === cat
                                                ? "_active-category"
                                                : ""
                                        }`}
                                        onClick={() => setTopic(cat)}
                                    >
                                        <p style={{ margin: 0 }}>{cat}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="pop-new-card__btn-create _hover01"
                            onClick={handleCreate}
                            disabled={isLoading}
                        >
                            {isLoading ? "Создание..." : "Создать задачу"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopNewCard;
