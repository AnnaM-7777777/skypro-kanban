import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainPage from "../components/pages/MainPage";
import CardNewPage from "../components/pages/CardNewPage";
import CardViewPage from "../components/pages/CardViewPage";
import CardEditPage from "../components/pages/CardEditPage";
import SignInPage from "../components/pages/SignInPage";
import SignUpPage from "../components/pages/SignUpPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import LogoutPage from "../components/pages/LogoutPage";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Публичные маршруты */}
            <Route path="/login" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/logout" element={<LogoutPage />} />

            {/* Защищённые маршруты */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                }
            >
                <Route path="task/new" element={<CardNewPage />} />
                <Route path="task/:id" element={<CardViewPage />} />
                <Route path="task/:id/edit" element={<CardEditPage />} />
            </Route>

            {/* Страница 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
