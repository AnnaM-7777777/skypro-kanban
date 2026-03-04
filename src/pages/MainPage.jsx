import "../App.css";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import { useKanban } from "../hooks/useKanban";
import { Wrapper, NoTasksText } from "./MainPage.styled";
import { MobileCreateButton } from "../components/Header/Header.styled";

function MainPage({ isDark, toggleTheme }) {
    const {
        columns,
        isLoading,
        error,
        onDeleteCard,
        onUpdateCard,
        onSaveOrder,
    } = useKanban();
    const navigate = useNavigate();
    const location = useLocation();

    const [showSkeleton, setShowSkeleton] = useState(false);
    const skeletonShownRef = useRef(false);

    const hideButton =
        location.pathname.includes("add-task") ||
        location.pathname.includes("card");

    // Показываем скелетон один раз при первой загрузке задач
    useEffect(() => {
        const totalCards = columns.reduce(
            (sum, col) => sum + col.cards.length,
            0,
        );

        if (!isLoading && totalCards > 0 && !skeletonShownRef.current) {
            skeletonShownRef.current = true;
            setTimeout(() => {
                setShowSkeleton(true);
                setTimeout(() => setShowSkeleton(false), 500);
            }, 0);
        }
    }, [isLoading, columns]);

    const handleAddTask = () => navigate("/add-task");

    // Проверка: есть ли хоть одна задача во всех колонках
    const hasTasks = columns.some((col) => col.cards.length > 0);

    return (
        <div className="wrapper">
            <Header isDark={isDark} toggleTheme={toggleTheme} />

            <Wrapper>
                {error && <NoTasksText>Ошибка: {error}</NoTasksText>}

                {!isLoading && !error && !hasTasks && (
                    <NoTasksText>Новых задач нет</NoTasksText>
                )}

                {!error && hasTasks && (
                    <Main
                        columns={columns}
                        isLoading={showSkeleton}
                        onDeleteCard={onDeleteCard}
                        onUpdateCard={onUpdateCard}
                        onSaveOrder={onSaveOrder}
                    />
                )}
            </Wrapper>

            <Outlet />

            {!hideButton && (
                <MobileCreateButton>
                    <Link to="/add-task">Создать новую задачу</Link>
                </MobileCreateButton>
            )}
        </div>
    );
}

export default MainPage;
