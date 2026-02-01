import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainPage from "../components/pages/MainPage";
import CardNewPage from "../components/pages/CardNewPage";
import CardViewPage from "../components/pages/CardViewPage";
import CardEditPage from "../components/pages/CardEditPage";
import SignInPage from "../components/pages/SignInPage";
import SignUpPage from "../components/pages/SignUpPage";
import NotFoundPage from "../components/pages/NotFoundPage";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Публичные маршруты */}
            <Route path="/login" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />

            {/* Защищённые маршруты */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/card/new"
                element={
                    <ProtectedRoute>
                        <CardNewPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/card/:id"
                element={
                    <ProtectedRoute>
                        <CardViewPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/card/:id/edit"
                element={
                    <ProtectedRoute>
                        <CardEditPage />
                    </ProtectedRoute>
                }
            />

            {/* Страница 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
