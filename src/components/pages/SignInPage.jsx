import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignInPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setEmail("");
        setPassword("");
        setError("");
    }, []);

    // Кнопка серая ТОЛЬКО когда есть ошибка
    const isButtonDisabled = error !== "";

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        // Валидация полей
        if (!email.trim() || !password.trim()) {
            setError("Пожалуйста, заполните все поля");
            return;
        }

        // Проверка формата email
        if (!email.includes("@") || !email.includes(".")) {
            setError("Неверный формат email. Пример: ivan@example.com");
            return;
        }

        // Проверка существования пользователя
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            setError("Пользователь не найден. Пожалуйста, зарегистрируйтесь.");
            return;
        }

        // Проверка данных
        if (storedUser.email !== email || storedUser.password !== password) {
            setError(
                "Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.",
            );
            return;
        }

        // Успешный вход
        navigate("/");
    };

    return (
        <div className="login-modal-overlay" onClick={() => navigate("/")}>
            <div
                className="login-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="login-modal-title">Вход</h3>
                <form
                    onSubmit={handleLogin}
                    className="login-modal-form"
                    noValidate
                >
                    <input
                        type="email"
                        placeholder="Эл. почта"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                        }}
                        required
                        className={`login-modal-input ${error ? "login-modal-input--error" : ""}`}
                        autoFocus
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (error) setError("");
                        }}
                        required
                        className={`login-modal-input ${error ? "login-modal-input--error" : ""}`}
                    />
                    {error && <div className="login-modal-error">{error}</div>}
                    <button
                        type="submit"
                        className="login-modal-button"
                        disabled={isButtonDisabled}
                    >
                        Войти
                    </button>
                </form>
                <div className="login-modal-footer">
                    Нужно зарегистрироваться?{" "}
                    <Link to="/register" className="login-modal-link">
                        Регистрируйтесь здесь
                    </Link>
                </div>
            </div>
        </div>
    );
}
