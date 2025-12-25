import { useState, useRef } from "react";
import Calendar from "../../Calendar/Calendar.jsx";

const PopNewCard = ({ isOpen, onClose, onSubmit }) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [selectedTopic, setSelectedTopic] = useState("Web Design");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSubmit) return;

        const newCard = {
            topic: selectedTopic,
            title: titleRef.current?.value || "",
            description: descriptionRef.current?.value || "",
            date: "08.09.2023",
        };

        onSubmit(newCard);
        onClose();
    };

    return (
        <div className="pop-new-card">
            <div className="pop-new-card__container">
                <div className="pop-new-card__block">
                    <div className="pop-new-card__content">
                        <h3 className="pop-new-card__ttl">Создание задачи</h3>
                        <button
                            className="pop-new-card__close"
                            onClick={onClose}
                            aria-label="Закрыть"
                        >
                            &#10006;
                        </button>

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

                            <Calendar month="Сентябрь 2023" selectedDate="08.09.2023" />
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