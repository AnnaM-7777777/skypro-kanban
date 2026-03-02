import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

import {
    LoginForm,
    LoginWrapper,
    Title,
    Input,
    Button,
    RegisterLink,
    ErrorText,
} from "./SignInPage.styled";

const SignInPage = ({ isDark }) => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoginError(false);
        setPasswordError(false);

        if (!login || !password) {
            setError("Заполните все поля");
            if (!login) setLoginError(true);
            if (!password) setPasswordError(true);
            return;
        }

        try {
            setLoading(true);
            await authLogin({ login: login.trim(), password: password.trim() });
            navigate("/", { replace: true });
        } catch {
            setError(
                "Введенные вами данные не распознаны. Проверьте логин и пароль.",
            );
            setLoginError(true);
            setPasswordError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginForm $isDark={isDark}>
            <LoginWrapper $isDark={isDark}>
                <Title $isDark={isDark}>Вход</Title>

                <form onSubmit={handleLogin}>
                    <Input
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        $error={loginError}
                        $isDark={isDark}
                    />

                    <Input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        $error={passwordError}
                        $isDark={isDark}
                    />

                    <Button type="submit" disabled={loading} $isDark={isDark}>
                        {loading ? "Входим..." : "Войти"}
                    </Button>
                </form>

                {error && <ErrorText>{error}</ErrorText>}

                <RegisterLink $isDark={isDark}>
                    Нужно зарегистрироваться?{" "}
                    <Link to="/register">Регистрируйтесь здесь</Link>
                </RegisterLink>
            </LoginWrapper>
        </LoginForm>
    );
};

export default SignInPage;
