import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

function PopUser({ onClose }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [isDarkTheme] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const handleExit = (e) => {
        e.preventDefault();
        logout();
        onClose?.();
        navigate("/login", { replace: true });
    };

    const handleClose = (e) => {
        e.preventDefault();
        onClose?.();
    };

    return (
        <div className="pop-exit-confirm" id="popExitConfirm">
            <div className="pop-exit-confirm__container">
                <div
                    className={`pop-exit-confirm__block ${isDarkTheme ? "dark-mode" : ""}`}
                >
                    <div className="pop-exit-confirm__title">
                        <h2>Выйти из аккаунта?</h2>
                    </div>

                    <div className="pop-exit-confirm__form">
                        <button
                            type="button"
                            className="pop-exit-confirm__exit-yes"
                            onClick={handleExit}
                        >
                            Да, выйти
                        </button>

                        <button
                            type="button"
                            className="pop-exit-confirm__exit-no"
                            onClick={handleClose}
                        >
                            Нет, остаться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUser;
