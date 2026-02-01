import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";

export default function CardNewPage() {
    const navigate = useNavigate();

    const [topic, setTopic] = useState("Web Design");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDateSelected, setIsDateSelected] = useState(false);

    const formatDateShortYear = (dateStr) => {
        if (!dateStr) return "";
        const parts = dateStr.split(".");
        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const shortYear = parts[2].slice(-2);
            return `${day}.${month}.${shortYear}`;
        }
        return dateStr;
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsDateSelected(true);
    };

    useEffect(() => {
        setTopic("Web Design");
        setTitle("");
        setDescription("");
        setSelectedDate(null);
        setIsDateSelected(false);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedDate) {
            alert("Пожалуйста, выберите дату выполнения задачи");
            return;
        }

        const newCard = {
            id: Date.now(),
            topic,
            title: title.trim(),
            description: description.trim(),
            date: selectedDate,
            status: "Без статуса",
        };

        const saved = localStorage.getItem("cards") || "[]";
        const cards = JSON.parse(saved);
        cards.push(newCard);
        localStorage.setItem("cards", JSON.stringify(cards));

        navigate("/");
    };

    // Закрытие при клике по фону
    const handleClose = () => {
        navigate("/");
    };

    return (
        <div className="pop-new-card">
            <div className="pop-new-card__container" onClick={handleClose}>
                <div
                    className="pop-new-card__block"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="pop-new-card__content">
                        <h3 className="pop-new-card__ttl">Создание задачи</h3>

                        <div className="pop-new-card__wrap">
                            <form
                                className="pop-new-card__form form-new"
                                onSubmit={handleSubmit}
                            >
                                <div className="form-new__block">
                                    <label
                                        htmlFor="formTitle"
                                        className="subttl"
                                    >
                                        Название задачи
                                    </label>
                                    <input
                                        className="form-new__input"
                                        type="text"
                                        id="formTitle"
                                        placeholder="Введите название задачи..."
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="form-new__block">
                                    <label
                                        htmlFor="textArea"
                                        className="subttl"
                                    >
                                        Описание задачи
                                    </label>
                                    <textarea
                                        className="form-new__area"
                                        id="textArea"
                                        placeholder="Введите описание задачи..."
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                            </form>

                            <div className="pop-new-card__calendar">
                                <Calendar
                                    selectedDate={selectedDate}
                                    onDateSelect={handleDateSelect}
                                />

                                {isDateSelected ? (
                                    <p
                                        className="pop-new-card__deadline subttl"
                                        style={{
                                            marginTop: "12px",
                                            textAlign: "left",
                                        }}
                                    >
                                        Срок исполнения:{" "}
                                        <span className="pop-new-card__span">
                                            {formatDateShortYear(selectedDate)}
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
                                        Выберите срок исполнения.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="pop-new-card__topics topics">
                            <p className="topics__p subttl">Категория</p>
                            <div className="topics__themes">
                                {["Web Design", "Research", "Copywriting"].map(
                                    (item) => (
                                        <div
                                            key={item}
                                            className={`topics__theme ${
                                                item === "Web Design"
                                                    ? "_orange"
                                                    : item === "Research"
                                                      ? "_green"
                                                      : "_purple"
                                            } ${topic === item ? "_active-topic" : ""}`}
                                            onClick={() => setTopic(item)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <p
                                                className={
                                                    item === "Web Design"
                                                        ? "_orange"
                                                        : item === "Research"
                                                          ? "_green"
                                                          : "_purple"
                                                }
                                            >
                                                {item}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        <button
                            className="form-new__create _hover01"
                            type="submit"
                        >
                            Создать задачу
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
