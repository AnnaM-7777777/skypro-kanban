import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Очистка данных пользователя
        localStorage.removeItem("user");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("darkTheme"); // опционально

        // Редирект на логин
        navigate("/login", { replace: true });
    }, [navigate]);

    // Показываем loader во время выхода
    return (
        <div className="logout-page">
            <div className="logout-container">
                <p>Выход из аккаунта...</p>
            </div>
        </div>
    );
}
