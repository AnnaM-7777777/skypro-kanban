import { useState, useEffect } from "react";
import { cards as initialCards } from "../../data";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopUser from "../popups/PopUser/PopUser";
import PopNewCard from "../popups/PopNewCard/PopNewCard";
import PopBrowse from "../popups/PopBrowse/PopBrowse";

export default function App() {
    const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
    const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
    const [isPopUserOpen, setIsPopUserOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCards(initialCards);
            setLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    // Группировка карточек по статусу
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

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsPopBrowseOpen(true);
    };

    const handleCreateCard = (newCardData) => {
        const newCard = {
            id: Date.now(),
            topic: newCardData.topic, // ← важно: в data.js поле называется `topic`
            title: newCardData.title,
            date: newCardData.date || "01.01.25",
            status: "Без статуса", // ← по умолчанию
        };
        setCards((prev) => [...prev, newCard]);
        setIsPopNewCardOpen(false);
    };

    return (
        <div className="wrapper">
            <PopNewCard
                isOpen={isPopNewCardOpen}
                onClose={() => setIsPopNewCardOpen(false)}
                onSubmit={handleCreateCard}
            />
            <PopBrowse
                isOpen={isPopBrowseOpen}
                card={selectedCard}
                onClose={() => setIsPopBrowseOpen(false)}
            />
            <PopUser
                isOpen={isPopUserOpen}
                onClose={() => setIsPopUserOpen(false)}
                user={{ name: "Ivan Ivanov", email: "ivan@example.com" }}
            />
            <Header
                onOpenNewCard={() => setIsPopNewCardOpen(true)}
                onTogglePopUser={() => setIsPopUserOpen((prev) => !prev)}
                isPopUserOpen={isPopUserOpen}
                user={{ name: "Ivan Ivanov", email: "ivan@example.com" }}
            />
            <Main
                columns={columnsWithCards}
                loading={loading}
                onCardClick={handleCardClick}
            />
        </div>
    );
}
