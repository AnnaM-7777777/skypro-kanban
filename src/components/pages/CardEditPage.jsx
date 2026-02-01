import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CardEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);

    useEffect(() => {
        const savedCards = localStorage.getItem("cards") || "[]";
        const cards = JSON.parse(savedCards);
        const found = cards.find((t) => t.id == id);
        if (found) {
            setCard({ ...found });
        }
    }, [id]);

    const handleChange = (field, value) => {
        setCard((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (card) {
            const savedCards = localStorage.getItem("cards") || "[]";
            const cards = JSON.parse(savedCards);
            const updatedCards = cards.map((t) => (t.id == id ? card : t));
            localStorage.setItem("cards", JSON.stringify(updatedCards));
            navigate(`/card/${id}`);
        }
    };

    if (!card)
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                Загрузка...
            </div>
        );

    return (
        <div className="card-form-container">
            <h2>Редактировать задачу</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={card.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                >
                    <option value="Web Design">Web Design</option>
                    <option value="Research">Research</option>
                    <option value="Copywriting">Copywriting</option>
                </select>
                <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                />
                <textarea
                    value={card.description || ""}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
                <input
                    type="date"
                    value={card.date || ""}
                    onChange={(e) => handleChange("date", e.target.value)}
                />
                <select
                    value={card.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                >
                    <option value="Без статуса">Без статуса</option>
                    <option value="Нужно сделать">Нужно сделать</option>
                    <option value="В работе">В работе</option>
                    <option value="Тестирование">Тестирование</option>
                    <option value="Готово">Готово</option>
                </select>
                <button type="submit">Сохранить</button>
                <button type="button" onClick={() => navigate(`/card/${id}`)}>
                    Отмена
                </button>
            </form>
        </div>
    );
}
