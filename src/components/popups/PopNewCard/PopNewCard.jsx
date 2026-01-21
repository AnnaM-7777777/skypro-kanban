import { useState, useRef, useEffect } from "react";
import Calendar from "../../Calendar/Calendar.jsx";

const PopNewCard = ({ isOpen, onClose, onSubmit }) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [selectedTopic, setSelectedTopic] = useState("Web Design");

    // Состояния для даты
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDateSelected, setIsDateSelected] = useState(false);

    // Форматирование даты: "16.01.2026" → "16.01.26"
    const formatDateShortYear = (dateStr) => {
        if (!dateStr) return "";
        const parts = dateStr.split(".");
        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const shortYear = parts[2].slice(-2); // последние 2 цифры года
            return `${day}.${month}.${shortYear}`;
        }
        return dateStr;
    };

    // Обработчик выбора даты
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsDateSelected(true);
    };

    // Сброс формы при открытии
    useEffect(() => {
        if (isOpen) {
            setSelectedTopic("Web Design");
            setSelectedDate(null);
            setIsDateSelected(false);
            if (titleRef.current) titleRef.current.value = "";
            if (descriptionRef.current) descriptionRef.current.value = "";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSubmit || !selectedDate) return;

        const newCard = {
            topic: selectedTopic,
            title: titleRef.current?.value.trim() || "",
            description: descriptionRef.current?.value.trim() || "",
            date: selectedDate,
        };

        onSubmit(newCard);
        onClose();
    };

    return (
        <div className="pop-new-card">
            <div 
                className="pop-new-card__container"
                onClick={onClose} // клик по фону → закрыть
            >
                <div 
                    className="pop-new-card__block"
                    onClick={(e) => e.stopPropagation()} // клик внутри → не закрывать
                >
                
                    <div className="pop-new-card__content">
                        <h3 className="pop-new-card__ttl">Создание задачи</h3>

                        <div className="pop-new-card__wrap">
                            <form className="pop-new-card__form form-new" onSubmit={handleSubmit}>
                                <div className="form-new__block">
                                    <label htmlFor="formTitle" className="subttl">
                                        Название задачи
                                    </label>
                                    <input
                                        ref={titleRef}
                                        className="form-new__input"
                                        type="text"
                                        id="formTitle"
                                        placeholder="Введите название задачи..."
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="form-new__block">
                                    <label htmlFor="textArea" className="subttl">
                                        Описание задачи
                                    </label>
                                    <textarea
                                        ref={descriptionRef}
                                        className="form-new__area"
                                        id="textArea"
                                        placeholder="Введите описание задачи..."
                                    ></textarea>
                                </div>
                            </form>

                            <div className="pop-new-card__сalendar">
                                <Calendar
                                    selectedDate={selectedDate}
                                    onDateSelect={handleDateSelect}
                                />

                                {/* Текст под календарём */}
                                {isDateSelected ? (
                                    <p className="pop-new-card__deadline subttl" style={{ marginTop: '12px', textAlign: 'left' }}>
                                        Срок исполнения: <span className="pop-new-card__span">{formatDateShortYear(selectedDate)}</span>
                                    </p>
                                ) : (
                                    <p className="pop-new-card__deadline subttl" style={{ marginTop: '12px', textAlign: 'left' }}>
                                        Выберите срок исполнения.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="pop-new-card__topics topics">
                            <p className="topics__p subttl">Категория</p>
                            <div className="topics__themes">
                                {["Web Design", "Research", "Copywriting"].map((topic) => (
                                    <div
                                        key={topic}
                                        className={`topics__theme ${
                                            topic === "Web Design" ? "_orange" :
                                            topic === "Research" ? "_green" : "_purple"
                                        } ${selectedTopic === topic ? "_active-topic" : ""}`}
                                        onClick={() => setSelectedTopic(topic)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <p className={
                                            topic === "Web Design" ? "_orange" :
                                            topic === "Research" ? "_green" : "_purple"
                                        }>
                                            {topic}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="form-new__create _hover01"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Создать задачу
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopNewCard;