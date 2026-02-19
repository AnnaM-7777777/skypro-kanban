import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CardEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setCard] = useState(null);

    useEffect(() => {
        const savedCards = localStorage.getItem("tasks") || "[]";
        const tasks = JSON.parse(savedCards);
        const found = tasks.find((t) => t.id == id);
        if (found) {
            setCard({ ...found });
        }
    }, [id]);

    const handleChange = (field, value) => {
        setCard((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task) {
            const savedCards = localStorage.getItem("tasks") || "[]";
            const tasks = JSON.parse(savedCards);
            const updatedCards = tasks.map((t) => (t.id == id ? task : t));
            localStorage.setItem("tasks", JSON.stringify(updatedCards));
            navigate(`/task/${id}`);
        }
    };

    if (!task)
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                Загрузка...
            </div>
        );

    return (
        <div className="task-form-container">
            <h2>Редактировать задачу</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={task.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                >
                    <option value="Web Design">Web Design</option>
                    <option value="Research">Research</option>
                    <option value="Copywriting">Copywriting</option>
                </select>
                <input
                    type="text"
                    value={task.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                />
                <textarea
                    value={task.description || ""}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
                <input
                    type="date"
                    value={task.date || ""}
                    onChange={(e) => handleChange("date", e.target.value)}
                />
                <select
                    value={task.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                >
                    <option value="Без статуса">Без статуса</option>
                    <option value="Нужно сделать">Нужно сделать</option>
                    <option value="В работе">В работе</option>
                    <option value="Тестирование">Тестирование</option>
                    <option value="Готово">Готово</option>
                </select>
                <button type="submit">Сохранить</button>
                <button type="button" onClick={() => navigate(`/task/${id}`)}>
                    Отмена
                </button>
            </form>
        </div>
    );
}
