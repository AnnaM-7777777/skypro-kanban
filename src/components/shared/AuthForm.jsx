import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../services/auth";

export default function AuthForm({ isSignUp = false }) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    // Валидация
    const isValidEmail = email.trim() !== "" && /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.trim().length >= 6;
    const isValidName =
        !isSignUp || (name.trim() !== "" && name.trim().length >= 2);

    const allValid = isValidEmail && isValidPassword && isValidName;

    const showEmailError = isSubmitted && !isValidEmail;
    const showPasswordError = isSubmitted && !isValidPassword;
    const showNameError = isSubmitted && isSignUp && !isValidName;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!allValid) {
            if (!isValidEmail) {
                setError("Введите корректный email");
            } else if (!isValidPassword) {
                setError("Пароль должен быть не менее 6 символов");
            } else if (isSignUp && !isValidName) {
                setError("Имя должно быть не менее 2 символов");
            }
            return;
        }

        try {
            setError("");
            let response;

            if (isSignUp) {
                response = await signUp({
                    name,
                    login: email,
                    password,
                });
            } else {
                response = await signIn({
                    login: email,
                    password,
                });
            }

            // Сохраняем данные как в рабочем примере
            localStorage.setItem("token", response.user.token);
            localStorage.setItem("user", JSON.stringify(response.user)); // Полный объект

            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message || "Ошибка авторизации");
        }
    };

    return (
        <div className="bg">
            <div className="login-modal-overlay">
                <div className="wrapper login-modal-content">
                    <h2 className="login-modal-title">
                        {isSignUp ? "Регистрация" : "Вход"}
                    </h2>

                    <form
                        className="login-modal-form"
                        onSubmit={handleSubmit}
                    >
                        {isSignUp && (
                            <input
                                type="text"
                                placeholder="Имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`login-modal-input ${showNameError ? "error" : ""}`}
                                autoFocus
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Эл. почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`login-modal-input ${showEmailError ? "error" : ""}`}
                            autoFocus={!isSignUp}
                        />

                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`login-modal-input ${showPasswordError ? "error" : ""}`}
                        />

                        <div className="login-modal-error">
                            {error && <p>{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="btn login-modal-button"
                            disabled={isSubmitted && !allValid}
                        >
                            {isSignUp ? "Зарегистрироваться" : "Войти"}
                        </button>

                        <div className="login-modal-footer">
                            {isSignUp ? (
                                <p>
                                    Есть аккаунт?{" "}
                                    <a
                                        href="/login"
                                        className="login-modal-link"
                                    >
                                        Войдите здесь
                                    </a>
                                </p>
                            ) : (
                                <p>
                                    Нужно зарегистрироваться?{" "}
                                    <a
                                        href="/register"
                                        className="login-modal-link"
                                    >
                                        Регистрация
                                    </a>
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
