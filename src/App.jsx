import AppRoutes from "./components/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ isDark, toggleTheme }) {
    return (
        <>
            <AppRoutes isDark={isDark} toggleTheme={toggleTheme} />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme={isDark ? "dark" : "light"}
            />
        </>
    );
}

export default App;
