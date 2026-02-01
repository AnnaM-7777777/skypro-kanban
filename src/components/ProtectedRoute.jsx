import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const user = localStorage.getItem("user");

    // Если не авторизован, перенаправляем на вход
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
