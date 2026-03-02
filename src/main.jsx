import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App.jsx";
import { GlobalStyle } from "./Global.styled";
import { lightTheme, darkTheme } from "./utils/theme";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </StrictMode>,
);

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
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <GlobalStyle />
            <App isDark={isDark} toggleTheme={toggleTheme} />
        </ThemeProvider>
    );
}

export default Root;
