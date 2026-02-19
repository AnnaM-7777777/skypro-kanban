import React, { useState } from 'react';
import PopExitConfirm from '../PopExitConfirm/PopExitConfirm'; // ← импортируем новое окно

export default function PopUser({
    isOpen,
    onClose,
    user,
    onThemeToggle,
    onLogout,
    isDarkTheme,
}) {
    const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);

    if (!isOpen || !user) return null;

    const handleExitClick = () => {
        setIsExitConfirmOpen(true);
    };

    const handleConfirmExit = () => {
        onLogout(); // ← вызываем logout
        onClose();  // ← закрываем pop-user
        setIsExitConfirmOpen(false); // ← закрываем окно подтверждения
    };

    return (
        <>
            <div className="header__pop-user-set pop-user-set">
                <p className="pop-user-set__name">{user.name}</p>
                <p className="pop-user-set__mail">{user.login}</p>
                <div className="pop-user-set__theme">
                    <p>Тёмная тема</p>
                    <input
                        type="checkbox"
                        checked={isDarkTheme}
                        onChange={onThemeToggle}
                        className="checkbox"
                    />
                </div>
                <button
                    type="button"
                    className="_hover03"
                    onClick={handleExitClick} // ← открывает окно подтверждения
                >
                    Выйти
                </button>
            </div>

            {/* Окно подтверждения */}
            <PopExitConfirm
                isOpen={isExitConfirmOpen}
                onClose={() => setIsExitConfirmOpen(false)}
                onConfirm={handleConfirmExit}
            />
        </>
    );
}