import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Проверяем авторизацию
        const user = localStorage.getItem("user");
        setIsAuth(!!user);
        setIsLoading(false);
    }, []);

    // Пока проверяем — показываем лоадер
    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <p>Загрузка...</p>
            </div>
        );
    }

    // Если не авторизован — редирект на /login
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
