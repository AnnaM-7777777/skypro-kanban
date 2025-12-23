/* import { useEffect } from "react";

export default function PopUser({ isOpen, onClose, user }) {
    // Закрытие по Esc и клику снаружи
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        const handleClickOutside = (e) => {
            if (!e.target.closest(".pop-user-set")) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="header__pop-user-set pop-user-set">
            <p className="pop-user-set__name">{user.name}</p>
            <p className="pop-user-set__mail">{user.email}</p>
            <div className="pop-user-set__theme">
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
            </div>
            
            <button
                type="button"
                className="_hover03"
                onClick={onClose}
            >
                <p>Выйти</p>
            </button>
        </div>
    );
} */

// В PopUser.jsx
export default function PopUser({ isOpen, onClose, user, onThemeToggle }) {
    if (!isOpen) return null;

    return (
        <div className="header__pop-user-set pop-user-set">
            <p className="pop-user-set__name">{user.name}</p>
            <p className="pop-user-set__mail">{user.email}</p>
            <div className="pop-user-set__theme">
                <p>Темная тема</p>
                <input
                    type="checkbox"
                    className="checkbox"
                    name="checkbox"
                    onChange={onThemeToggle}
                />
            </div>
            <button type="button" className="_hover03" onClick={onClose}>
                Выйти
            </button>
        </div>
    );
}
