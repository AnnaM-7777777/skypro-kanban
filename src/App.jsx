/* import AppRoutes from "./components/AppRoutes";

function App() {
    return <AppRoutes />;
}

export default App;
 */

import AppRoutes from "./components/AppRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { TaskProvider } from "./context/TaskProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ isDark, toggleTheme }) {
    return (
        <AuthProvider>
            <TaskProvider>
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
            </TaskProvider>
        </AuthProvider>
    );
}

export default App;
