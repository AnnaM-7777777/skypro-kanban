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
            setCards(initialCards); // используем данные из data.js
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

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
