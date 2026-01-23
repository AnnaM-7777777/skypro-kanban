import React, { useState } from "react";

export default function PopLogin({
    isOpen,
    onClose,
    onLogin,
    onSwitchToRegister,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    return (
        <div className="login-modal-overlay" onClick={onClose}>
            <div
                className="login-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="login-modal-title">Вход</h3>
                <form onSubmit={handleSubmit} className="login-modal-form">
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
                        Войти
                    </button>
                </form>
                <div className="login-modal-footer">
                    Нужно зарегистрироваться?{" "}
                    <button
                        type="button"
                        className="login-modal-link"
                        onClick={onSwitchToRegister}
                    >
                        Регистрируйтесь здесь
                    </button>
                </div>
            </div>
        </div>
    );
}
