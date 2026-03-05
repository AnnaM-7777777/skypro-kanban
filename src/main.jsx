import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthProvider";
import { TaskProvider } from "./context/TaskProvider";
import App from "./App.jsx";
import { GlobalStyle } from "./Global.styled";
import { lightTheme, darkTheme } from "./utils/theme";

function Root() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const toggleTheme = () => {
        setIsDark((prev) => {
            const next = !prev;
            localStorage.setItem("theme", next ? "dark" : "light");
            return next;
        });
    };

    return (
        <StrictMode>
            <BrowserRouter>
                <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                    <AuthProvider>
                        <TaskProvider>
                            <GlobalStyle />
                            <App isDark={isDark} toggleTheme={toggleTheme} />
                        </TaskProvider>
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </StrictMode>
    );
}

createRoot(document.getElementById("root")).render(<Root />);

export default Root;
