import { useState } from "react";
import Calendar from "../../Calendar/Calendar.jsx";

const PopBrowse = ({ isOpen, onClose, card, onUpdate, onDelete }) => {
    if (!isOpen || !card) return null;

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(card.title);
    const [editDescription, setEditDescription] = useState(card.description);
    const [editStatus, setEditStatus] = useState(card.status);
    const [editDate, setEditDate] = useState(card.date);

    // Форматирование даты: "16.01.2026" → "16.01.26"
    const formatDateShortYear = (dateStr) => {
        if (!dateStr) return "";
        const parts = dateStr.split(".");
        if (parts.length === 3) {
            return `${parts[0]}.${parts[1]}.${parts[2].slice(-2)}`;
        }
        return dateStr;
    };

    const handleSave = () => {
        if (onUpdate) {
            onUpdate({
                ...card,
                title: editTitle,
                description: editDescription,
                status: editStatus,
                date: editDate,
            });
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(card.title);
        setEditDescription(card.description);
        setEditStatus(card.status);
        setEditDate(card.date);
        setIsEditing(false);
    };

    const handleStatusChange = (newStatus) => {
        setEditStatus(newStatus);
    };

    const handleDateSelect = (date) => {
        setEditDate(date);
    };

    const handleDelete = () => {
        if (onDelete && card) {
            onDelete(card.id);
        }
        onClose();
    };

    return (
        <div className="pop-browse">
            <div className="pop-browse__container">
                <div className="pop-browse__block">
                    <div className="pop-browse__content">
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
                                className={`topics__theme theme-top _${card.topic === "Web Design" ? "orange" : card.topic === "Research" ? "green" : "purple"} _active-topic`}
                            >
                                <p
                                    className={`_${card.topic === "Web Design" ? "orange" : card.topic === "Research" ? "green" : "purple"}`}
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

                            <div className="pop-new-card__сalendar">
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
                                        <Calendar
                                            month="Январь 2026"
                                            selectedDate={editDate}
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
                                )}
                            </div>
                        </div>

                        <div className="theme-down__topics theme-down">
                            <p className="topics__p subttl">Категория</p>
                            <div
                                className={`topics__theme _${card.topic === "Web Design" ? "orange" : card.topic === "Research" ? "green" : "purple"} _active-topic`}
                            >
                                <p
                                    className={`_${card.topic === "Web Design" ? "orange" : card.topic === "Research" ? "green" : "purple"}`}
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
                                        onClick={() => {
                                            if (confirm("Удалить задачу?")) {
                                                handleDelete();
                                            }
                                        }}
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
                                        onClick={() => {
                                            if (confirm("Удалить задачу?")) {
                                                handleDelete(); // ← вызываем функцию
                                            }
                                        }}
                                    >
                                        Удалить задачу
                                    </button>
                                </div>
                            )}
                            <button
                                className="btn-browse__close _btn-bg _hover01"
                                onClick={onClose}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopBrowse;
