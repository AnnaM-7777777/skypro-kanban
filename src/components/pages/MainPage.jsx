import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopUser from "../popups/PopUser/PopUser";
import { cards as initialCards } from "../../data";

export default function MainPage() {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isPopUserOpen, setIsPopUserOpen] = useState(false);

    // Загрузка задач из localStorage или initialCards
    useEffect(() => {
        const savedCards = localStorage.getItem("cards");
        if (savedCards) {
            setCards(JSON.parse(savedCards));
        } else {
            setCards(initialCards);
        }
        setLoading(false);
    }, []);

    // Сохранение задач в localStorage
    useEffect(() => {
        if (!loading) {
            localStorage.setItem("cards", JSON.stringify(cards));
        }
    }, [cards, loading]);

    // Сохранение пользователя
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

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
        navigate(`/card/${card.id}`);
    };

    const handleOpenNewCard = () => {
        navigate("/card/new");
    };

    const handleThemeToggle = () => {
        setIsDarkTheme((prev) => !prev);
    };

    const handleLogout = () => {
        setUser(null);
        setIsPopUserOpen(false);
        navigate("/login");
    };

    const togglePopUser = () => {
        setIsPopUserOpen((prev) => !prev);
    };

    return (
        <>
            {user && isPopUserOpen && (
                <PopUser
                    isOpen={true}
                    onClose={() => setIsPopUserOpen(false)}
                    user={user}
                    isDarkTheme={isDarkTheme}
                    onThemeToggle={handleThemeToggle}
                    onLogout={handleLogout}
                />
            )}

            <Header
                user={user}
                isDarkTheme={isDarkTheme}
                onThemeToggle={handleThemeToggle}
                onLogout={handleLogout}
                onTogglePopUser={togglePopUser}
            />
            <Main
                columns={columnsWithCards}
                loading={loading}
                onCardClick={handleCardClick}
            />
        </>
    );
}
