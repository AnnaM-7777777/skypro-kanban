import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopUser from "../popups/PopUser/PopUser";
import { fetchCards } from "../../services/api";
import { getToken } from "../../services/auth";

export default function MainPage() {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isPopUserOpen, setIsPopUserOpen] = useState(false);

    // Загрузка карточек с сервера
    useEffect(() => {
        const loadCards = async () => {
            try {
                setLoading(true);
                setError("");

                const token = getToken();
                if (!token) {
                    navigate("/login");
                    return;
                }

                const data = await fetchCards({ token });
                
                // Защита: убедимся, что данные — это массив
                if (Array.isArray(data)) {
                    setCards(data);
                } else if (data && Array.isArray(data.cards)) {
                    setCards(data.cards);
                } else {
                    setCards([]);
                }
            } catch (err) {
                console.error("Ошибка загрузки карточек:", err);
                setError(err.message || "Ошибка загрузки данных");
                // Загрузка из localStorage как резерв
                const savedCards = localStorage.getItem("cards") || "[]";
                setCards(JSON.parse(savedCards));
            } finally {
                setLoading(false);
            }
        };

        loadCards();
    }, [navigate]);

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

    // Защита: убедимся, что cards — это массив
    const columnsWithCards = columnConfigs.map((col) => ({
        ...col,
        cards: Array.isArray(cards)
            ? cards.filter((card) => 
                card?.status?.trim() === col.title.trim()
            )
            : [],
    }));

    const handleCardClick = (card) => {
        navigate(`/card/${card.id}`);
    };

    const handleThemeToggle = () => {
        setIsDarkTheme((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsPopUserOpen(false);
        navigate("/login");
    };

    const togglePopUser = () => {
        setIsPopUserOpen((prev) => !prev);
    };

    if (error) {
        return (
            <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
                {error}
            </div>
        );
    }

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

            <Outlet />
        </>
    );
}