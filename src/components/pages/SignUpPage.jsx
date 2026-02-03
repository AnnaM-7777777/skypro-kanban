import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUpPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setName("");
        setEmail("");
        setPassword("");
        setError("");
    }, []);

    // Кнопка серая ТОЛЬКО когда есть ошибка
    const isButtonDisabled = error !== "";

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        // Валидация полей
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError(
                "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме.",
            );
            return;
        }

        // Проверка формата email
        if (!email.includes("@") || !email.includes(".")) {
            setError(
                "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.",
            );
            return;
        }

        // Проверка длины пароля
        if (password.length < 6) {
            setError("Пароль должен содержать не менее 6 символов");
            return;
        }

        // Проверка, не существует ли уже пользователь
        const existingUser = JSON.parse(localStorage.getItem("user"));
        if (existingUser) {
            setError("Пользователь с таким именем уже существует");
            return;
        }

        // Сохранение пользователя
        const userData = {
            name,
            email,
            password,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
    };

    return (
        <div className="login-modal-overlay" onClick={() => navigate("/")}>
            <div
                className="login-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="login-modal-title">Регистрация</h3>
                <form
                    onSubmit={handleRegister}
                    className="login-modal-form"
                    noValidate
                >
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError("");
                        }}
                        required
                        className={`login-modal-input ${error ? "login-modal-input--error" : ""}`}
                        autoFocus
                    />
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
                        Зарегистрироваться
                    </button>
                </form>
                <div className="login-modal-footer">
                    Уже есть аккаунт?{" "}
                    <Link to="/login" className="login-modal-link">
                        Войдите здесь
                    </Link>
                </div>
            </div>
        </div>
    );
}
