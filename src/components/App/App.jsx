// src/App.jsx
import { useState, useEffect } from "react";
import { cards as initialCards } from "../../data";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopUser from "../popups/PopUser/PopUser";
import PopNewCard from "../popups/PopNewCard/PopNewCard";
import PopBrowse from "../popups/PopBrowse/PopBrowse";

export default function App() {
    // Единое состояние для модальных окон
    const [activePopup, setActivePopup] = useState(null); // null | 'new' | 'browse' | 'user'
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false); // ← тема здесь

    // Загрузка карточек
    useEffect(() => {
        const timer = setTimeout(() => {
            setCards(initialCards);
            setLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    // Группировка по статусу
    const columnConfigs = [
        { id: "backlog", title: "Без статуса" },
        { id: "todo", title: "Нужно сделать" },
        { id: "inprogress", title: "В работе" },
        { id: "testing", title: "Тестирование" },
        { id: "done", title: "Готово" },
    ];

    const columnsWithCards = columnConfigs.map((col) => ({
        ...col,
        cards: cards.filter((card) => card.status === col.title),
    }));

    // Обработчики открытия
    const openNewCard = () => {
        setActivePopup("new");
    };

    const openBrowse = (card) => {
        setSelectedCard(card);
        setActivePopup("browse");
    };

    const toggleUserPopup = () => {
        setActivePopup(activePopup === "user" ? null : "user");
    };

    // Обработчик создания карточки
    const handleCreateCard = (newCardData) => {
        const newCard = {
            id: Date.now(),
            topic: newCardData.topic,
            title: newCardData.title,
            description: newCardData.description,
            date: newCardData.date || "01.01.25",
            status: "Без статуса",
        };
        setCards((prev) => [...prev, newCard]);
        setActivePopup(null);
    };

    // Данные пользователя
    const user = { name: "Ivan Ivanov", email: "ivan@example.com" };

    return (
        <div className="wrapper">
            {/* Модальные окна — только здесь */}
            <PopNewCard
                isOpen={activePopup === "new"}
                onClose={() => setActivePopup(null)}
                onSubmit={handleCreateCard}
            />
            <PopBrowse
                isOpen={activePopup === "browse"}
                card={selectedCard}
                onClose={() => setActivePopup(null)}
            />
            <PopUser
                isOpen={activePopup === "user"}
                onClose={() => setActivePopup(null)}
                user={user}
                isDarkTheme={isDarkTheme}
                onThemeToggle={() => setIsDarkTheme((prev) => !prev)}
            />

            {/* Основной интерфейс */}
            <Header
                onOpenNewCard={openNewCard}
                onTogglePopUser={toggleUserPopup}
                user={user}
                isDarkTheme={isDarkTheme} // ← передаём тему в Header
            />
            <Main
                columns={columnsWithCards}
                loading={loading}
                onCardClick={openBrowse}
            />
        </div>
    );
}