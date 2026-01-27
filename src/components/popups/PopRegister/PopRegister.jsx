import React, { useState } from "react";

export default function PopRegister({
    isOpen,
    onClose,
    onRegister,
    onSwitchToLogin,
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ name, email, password });
    };

    return (
        <div className="login-modal-overlay" onClick={onClose}>
            <div
                className="login-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="login-modal-title">Регистрация</h3>
                <form onSubmit={handleSubmit} className="login-modal-form">
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="login-modal-input"
                    />
                    <input
                        type="email"
                        placeholder="Эл. почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-modal-input"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-modal-input"
                    />
                    <button type="submit" className="login-modal-button">
                        Зарегистрироваться
                    </button>
                </form>
                <div className="login-modal-footer">
                    Уже есть аккаунт?{" "}
                    <button
                        type="button"
                        className="login-modal-link"
                        onClick={onSwitchToLogin}
                    >
                        Войдите здесь
                    </button>
                </div>
            </div>
        </div>
    );
}
