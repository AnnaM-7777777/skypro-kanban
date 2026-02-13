import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import { fetchCardById, updateCard, deleteCard } from "../../services/api";
import { getToken } from "../../services/auth";

export default function CardViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [editDate, setEditDate] = useState("");
    const [error, setError] = useState("");

    // Загрузка карточки с сервера
    useEffect(() => {
        const loadCard = async () => {
            try {
                setLoading(true);
                setError("");

                const token = getToken();
                if (!token) {
                    navigate("/login");
                    return;
                }

                const data = await fetchCardById({ token, id });
                setCard(data);
                setEditTitle(data.title);
                setEditDescription(data.description);
                setEditStatus(data.status);
                setEditDate(data.date);
            } catch (err) {
                console.error("Ошибка загрузки задачи:", err);
                setError(err.message);

                // Резерв: загрузка из localStorage
                const savedCards = localStorage.getItem("cards") || "[]";
                const cards = JSON.parse(savedCards);
                const found = cards.find((t) => t.id == id);
                if (found) {
                    setCard(found);
                    setEditTitle(found.title);
                    setEditDescription(found.description);
                    setEditStatus(found.status);
                    setEditDate(found.date);
                }
            } finally {
                setLoading(false);
            }
        };

        loadCard();
    }, [id, navigate]);

    // Форматирование даты
    const formatDateShortYear = (dateStr) => {
        if (!dateStr) return "";
        const parts = dateStr.split(".");
        if (parts.length === 3) {
            return `${parts[0]}.${parts[1]}.${parts[2].slice(-2)}`;
        }
        return dateStr;
    };

    // Сохранение изменений через API
    const handleSave = async () => {
        try {
            const token = getToken();
            if (!token) {
                setError("Необходима авторизация");
                return;
            }

            const updatedTask = {
                title: editTitle,
                description: editDescription,
                status: editStatus,
                date: editDate,
                topic: card.topic,
            };

            await updateCard({ token, id, task: updatedTask });
            navigate("/");
        } catch (err) {
            console.error("Ошибка обновления задачи:", err);
            setError(err.message);
        }
    };

    // Отмена редактирования
    const handleCancel = () => {
        if (card) {
            setEditTitle(card.title);
            setEditDescription(card.description);
            setEditStatus(card.status);
            setEditDate(card.date);
        }
        setIsEditing(false);
    };

    // Изменение статуса
    const handleStatusChange = (newStatus) => {
        setEditStatus(newStatus);
    };

    // Выбор даты
    const handleDateSelect = (date) => {
        setEditDate(date);
    };

    // Удаление карточки через API
    const handleDelete = async () => {
        if (!confirm("Удалить задачу?")) return;

        try {
            const token = getToken();
            if (!token) {
                setError("Необходима авторизация");
                return;
            }

            await deleteCard({ token, id });
            navigate("/");
        } catch (err) {
            console.error("Ошибка удаления задачи:", err);
            setError(err.message);

            // Резерв: удаление из localStorage
            const savedCards = localStorage.getItem("cards") || "[]";
            const cards = JSON.parse(savedCards);
            const updatedCards = cards.filter((t) => t.id != id);
            localStorage.setItem("cards", JSON.stringify(updatedCards));
            navigate("/");
        }
    };

    // Закрытие
    const handleClose = () => {
        navigate("/");
    };

    if (loading) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                Загрузка...
            </div>
        );
    }

    if (!card) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                Задача не найдена
            </div>
        );
    }

    return (
        <div className="pop-browse">
            <div className="pop-browse__container">
                <div className="pop-browse__block">
                    <div className="pop-browse__content">
                        {error && (
                            <div
                                style={{
                                    color: "red",
                                    marginBottom: "16px",
                                    padding: "8px",
                                    backgroundColor: "#ffebee",
                                    borderRadius: "4px",
                                }}
                            >
                                {error}
                            </div>
                        )}

                        <div className="pop-browse__top-block">
                            {isEditing ? (
                                <input
                                    className="pop-browse__ttl-input"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "600",
                                        border: "none",
                                        outline: "none",
                                        width: "100%",
                                        background: "transparent",
                                    }}
                                />
                            ) : (
                                <h3 className="pop-browse__ttl">{editTitle}</h3>
                            )}
                            <div
                                className={`topics__theme theme-top _${
                                    card.topic === "Web Design"
                                        ? "orange"
                                        : card.topic === "Research"
                                          ? "green"
                                          : "purple"
                                } _active-topic`}
                            >
                                <p
                                    className={`_${
                                        card.topic === "Web Design"
                                            ? "orange"
                                            : card.topic === "Research"
                                              ? "green"
                                              : "purple"
                                    }`}
                                >
                                    {card.topic}
                                </p>
                            </div>
                        </div>

                        <div className="pop-browse__status status">
                            <p className="status__p subttl">Статус</p>
                            <div className="status__themes">
                                {isEditing ? (
                                    <>
                                        {[
                                            "Без статуса",
                                            "Нужно сделать",
                                            "В работе",
                                            "Тестирование",
                                            "Готово",
                                        ].map((status) => (
                                            <button
                                                key={status}
                                                className={`status__theme ${
                                                    editStatus === status
                                                        ? "_active-status"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleStatusChange(status)
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                <p>{status}</p>
                                            </button>
                                        ))}
                                    </>
                                ) : (
                                    <div className="status__theme _gray">
                                        <p>{editStatus}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pop-browse__wrap">
                            <form className="pop-browse__form form-browse">
                                <div className="form-browse__block">
                                    <label
                                        htmlFor="textArea01"
                                        className="subttl"
                                    >
                                        Описание задачи
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            className="form-browse__area"
                                            id="textArea01"
                                            value={editDescription}
                                            onChange={(e) =>
                                                setEditDescription(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Введите описание задачи..."
                                        ></textarea>
                                    ) : (
                                        <textarea
                                            className="form-browse__area"
                                            id="textArea01"
                                            readOnly
                                            value={editDescription || ""}
                                            placeholder="Описание задачи"
                                        ></textarea>
                                    )}
                                </div>
                            </form>

                            <div className="pop-new-card__calendar">
                                {isEditing ? (
                                    <>
                                        <Calendar
                                            selectedDate={editDate}
                                            onDateSelect={handleDateSelect}
                                        />
                                        {editDate ? (
                                            <p
                                                className="pop-new-card__deadline subttl"
                                                style={{
                                                    marginTop: "12px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Срок исполнения:{" "}
                                                <span className="pop-new-card__span">
                                                    {formatDateShortYear(
                                                        editDate,
                                                    )}
                                                </span>
                                            </p>
                                        ) : (
                                            <p
                                                className="pop-new-card__deadline subttl"
                                                style={{
                                                    marginTop: "12px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Срок исполнения не задан.
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Calendar selectedDate={editDate} />
                                        {editDate ? (
                                            <p
                                                className="pop-new-card__deadline subttl"
                                                style={{
                                                    marginTop: "12px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Срок исполнения:{" "}
                                                <span className="pop-new-card__span">
                                                    {formatDateShortYear(
                                                        editDate,
                                                    )}
                                                </span>
                                            </p>
                                        ) : (
                                            <p
                                                className="pop-new-card__deadline subttl"
                                                style={{
                                                    marginTop: "12px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Срок исполнения не задан.
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="theme-down__topics theme-down">
                            <p className="topics__p subttl">Категория</p>
                            <div
                                className={`topics__theme _${
                                    card.topic === "Web Design"
                                        ? "orange"
                                        : card.topic === "Research"
                                          ? "green"
                                          : "purple"
                                } _active-topic`}
                            >
                                <p
                                    className={`_${
                                        card.topic === "Web Design"
                                            ? "orange"
                                            : card.topic === "Research"
                                              ? "green"
                                              : "purple"
                                    }`}
                                >
                                    {card.topic}
                                </p>
                            </div>
                        </div>

                        <div className="pop-browse__btn-browse">
                            {isEditing ? (
                                <div className="btn-group">
                                    <button
                                        className="btn-browse__save _btn-bg _hover01"
                                        onClick={handleSave}
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        className="btn-browse__cancel _btn-bor _hover03"
                                        onClick={handleCancel}
                                    >
                                        Отменить
                                    </button>
                                    <button
                                        className="btn-browse__delete _btn-bor _hover03"
                                        onClick={handleDelete}
                                    >
                                        Удалить задачу
                                    </button>
                                </div>
                            ) : (
                                <div className="btn-group">
                                    <button
                                        className="btn-browse__edit _btn-bor _hover03"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Редактировать задачу
                                    </button>
                                    <button
                                        className="btn-browse__delete _btn-bor _hover03"
                                        onClick={handleDelete}
                                    >
                                        Удалить задачу
                                    </button>
                                </div>
                            )}

                            <button
                                className="btn-browse__close _btn-bg _hover01"
                                onClick={handleClose}
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
