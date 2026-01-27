// src/App.jsx
import { useState, useEffect } from "react";
import { cards as initialCards } from "../../data"; // данные — вне components/

// Все компоненты — соседи в components/
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopUser from "../popups/PopUser/PopUser";
import PopNewCard from "../popups/PopNewCard/PopNewCard";
import PopBrowse from "../popups/PopBrowse/PopBrowse";
import PopLogin from "../popups/PopLogin/PopLogin";
import PopRegister from "../popups/PopRegister/PopRegister";

export default function App() {
  const [activePopup, setActivePopup] = useState(null); // 'new' | 'browse' | 'user' | 'login' | 'register'
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState(() => {
    // Можно загрузить из localStorage
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(initialCards);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Сохраняем пользователя в localStorage при изменении
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
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

  const openNewCard = () => setActivePopup("new");
  const openBrowse = (card) => {
    setSelectedCard(card);
    setActivePopup("browse");
  };

  const toggleUserPopup = () => {
    if (user) {
      setActivePopup(activePopup === "user" ? null : "user");
    } else {
      setActivePopup(activePopup === "login" ? null : "login");
    }
  };

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

  const handleLogin = (credentials) => {
    // Здесь можно проверить API, но для примера:
    setUser({
      name: "Anna",
      email: credentials.email,
    });
    setActivePopup(null);
  };

  const handleRegister = (userData) => {
    setUser({
      name: userData.name,
      email: userData.email,
    });
    setActivePopup(null);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="wrapper">
      {/* Модальные окна */}
      <PopNewCard
        isOpen={activePopup === "new"}
        onClose={() => setActivePopup(null)}
        onSubmit={handleCreateCard}
      />
      <PopBrowse
        isOpen={activePopup === "browse"}
        card={selectedCard}
        onClose={() => setActivePopup(null)}
        onUpdate={(updatedCard) =>
          setCards((prev) =>
            prev.map((c) => (c.id === updatedCard.id ? updatedCard : c))
          )
        }
        onDelete={(cardId) =>
          setCards((prev) => prev.filter((c) => c.id !== cardId))
        }
      />
      {user && (
        <PopUser
          isOpen={activePopup === "user"}
          onClose={() => setActivePopup(null)}
          user={user}
          isDarkTheme={isDarkTheme}
          onThemeToggle={() => setIsDarkTheme((prev) => !prev)}
          onLogout={handleLogout}
        />
      )}
      {!user && (
        <>
          <PopLogin
            isOpen={activePopup === "login"}
            onClose={() => setActivePopup(null)}
            onLogin={handleLogin}
            onSwitchToRegister={() => setActivePopup("register")}
          />
          <PopRegister
            isOpen={activePopup === "register"}
            onClose={() => setActivePopup(null)}
            onRegister={handleRegister}
            onSwitchToLogin={() => setActivePopup("login")}
          />
        </>
      )}

      {/* Основной интерфейс */}
      <Header
        onOpenNewCard={openNewCard}
        onTogglePopUser={toggleUserPopup}
        user={user}
        isDarkTheme={isDarkTheme}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onThemeToggle={() => setIsDarkTheme((prev) => !prev)}
      />
      <Main
        columns={columnsWithCards}
        loading={loading}
        onCardClick={openBrowse}
      />
    </div>
  );
}