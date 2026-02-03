import { Link, useNavigate } from "react-router-dom";

export default function AuthForm({ isSignUp, onAuth }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = {
            ...(isSignUp && { name: formData.get("name") }),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        onAuth(data);
        navigate("/");
    };

    return (
        <div className="auth-container">
            <h2>{isSignUp ? "Регистрация" : "Вход"}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {isSignUp && (
                    <input type="text" name="name" placeholder="Имя" required />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Эл. почта"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                <button type="submit">
                    {isSignUp ? "Зарегистрироваться" : "Войти"}
                </button>
            </form>

            <div className="auth-links">
                {isSignUp ? (
                    <p>
                        Есть аккаунт? <Link to="/login">Войдите</Link>
                    </p>
                ) : (
                    <p>
                        Нужно зарегистрироваться?{" "}
                        <Link to="/register">Зарегистрируйтесь</Link>
                    </p>
                )}
            </div>
        </div>
    );
}
