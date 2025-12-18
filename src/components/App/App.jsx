import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopUser from "../popups/PopUser/PopUser";
import PopNewCard from "../popups/PopNewCard/PopNewCard";
import PopBrowse from "../popups/PopBrowse/PopBrowse";

export default function App() {
    // Состояния модалок
    const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
    const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
    const [isPopUserOpen, setIsPopUserOpen] = useState(false);

    // Состояния данных
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loading, setLoading] = useState(true);

    // Имитация загрузки
    useEffect(() => {
        const initialCards = [
            {
                id: 1,
                title: "Создать макет главной",
                description: "Figma",
                category: "Web Design",
                date: "30.10.23",
                status: "Без статуса",
            },
            {
                id: 2,
                title: "Исследование конкурентов",
                description: "Анализ",
                category: "Research",
                date: "05.11.23",
                status: "Нужно сделать",
            },
            {
                id: 3,
                title: "Написать техзадание",
                description: "",
                category: "Copywriting",
                date: "10.11.23",
                status: "В работе",
            },
        ];
        const timer = setTimeout(() => {
            setCards(initialCards);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Обработчики
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsPopBrowseOpen(true);
    };

    const handleCreateCard = (newCardData) => {
        const newCard = {
            id: Date.now(),
            ...newCardData,
            status: "Без статуса",
            date: "01.01.25",
        };
        setCards((prev) => [...prev, newCard]);
        setIsPopNewCardOpen(false);
    };

    return (
        <div className="wrapper">
            {/* Модальные окна */}
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
                isPopUserOpen={isPopUserOpen}
                onTogglePopUser={() => setIsPopUserOpen((prev) => !prev)}
                user={{ name: "Ivan Ivanov", email: "ivan@example.com" }}
            />
            <Main
                cards={cards}
                loading={loading}
                onCardClick={handleCardClick}
            />
        </div>
    );
}
