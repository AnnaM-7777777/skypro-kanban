import { Routes, Route, Link } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "../pages/ProtectedRoute";
import PopUser from "../components/popups/popExitConfirm";
import PopBrowse from "../components/popups/popBrowse";
import PopNewCard from "../components/popups/popNewCard";

function AppRoutes({ isDark, toggleTheme }) {
    return (
        <>
            <Routes>
                <Route path="/login" element={<SignInPage isDark={isDark} />} />
                <Route
                    path="/register"
                    element={<SignUpPage isDark={isDark} />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/"
                        element={
                            <MainPage
                                isDark={isDark}
                                toggleTheme={toggleTheme}
                            />
                        }
                    >
                        <Route path="exit" element={<PopUser />} />
                        <Route path="card/:id" element={<PopBrowse />} />
                        <Route path="add-task" element={<PopNewCard />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
