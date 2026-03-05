import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
    Bg,
    Modal,
    ModalWrapper,
    Title,
    Form,
    Input,
    Button,
    FormGroup,
    ErrorText,
} from "./AuthForm.styled";

// Регулярное выражение для валидации email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthForm = ({ isSignUp }) => {
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const [loginValue, setLoginValue] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Сбрасываем ошибки полей
        setLoginError(false);
        setPasswordError(false);
        setNameError(false);

        let hasError = false;
        let hasEmailError = false;

        // Валидация email (отдельно)
        if (!loginValue.trim()) {
            setLoginError(true);
            hasError = true;
        } else if (!EMAIL_REGEX.test(loginValue.trim())) {
            setLoginError(true);
            hasEmailError = true;
            hasError = true;
        }

        // Валидация пароля
        if (!password.trim()) {
            setPasswordError(true);
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError(true);
            hasError = true;
        }

        // Валидация имени (только для регистрации)
        if (isSignUp && !name.trim()) {
            setNameError(true);
            hasError = true;
        }

        // Показываем соответствующее сообщение
        if (hasError) {
            if (hasEmailError) {
                // Некорректный email
                setError(
                    "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.",
                );
            } else {
                // Пустые поля или короткий пароль
                setError(
                    "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме.",
                );
            }
            return;
        }

        try {
            setLoading(true);

            if (isSignUp) {
                await register({
                    login: loginValue.trim(),
                    password: password.trim(),
                    name: name.trim(),
                });
            } else {
                await login({
                    login: loginValue.trim(),
                    password: password.trim(),
                });
            }

            navigate("/", { replace: true });
        } catch (err) {
            setError(
                err ||
                    "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.",
            );
            setLoginError(true);
            setPasswordError(true);
            if (isSignUp) setNameError(true);
        } finally {
            setLoading(false);
        }
    };

    // Обработчики onChange
    const handleLoginChange = (e) => {
        setLoginValue(e.target.value);
        if (loginError) setLoginError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) setPasswordError(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (nameError) setNameError(false);
    };

    return (
        <Bg>
            <Modal>
                <ModalWrapper>
                    <Title>{isSignUp ? "Регистрация" : "Вход"}</Title>

                    {/* Добавляем noValidate для отключения нативной валидации браузера */}
                    <Form onSubmit={handleSubmit} noValidate>
                        {isSignUp && (
                            <Input
                                type="text"
                                placeholder="Имя"
                                value={name}
                                onChange={handleNameChange}
                                $error={nameError}
                            />
                        )}

                        <Input
                            type="email"
                            placeholder="Email"
                            value={loginValue}
                            onChange={handleLoginChange}
                            autoComplete="email"
                            $error={loginError}
                        />

                        <Input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete={
                                isSignUp ? "new-password" : "current-password"
                            }
                            $error={passwordError}
                        />

                        {error && <ErrorText>{error}</ErrorText>}

                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                loginError ||
                                passwordError ||
                                (isSignUp && nameError)
                            }
                        >
                            {loading
                                ? "Загрузка..."
                                : isSignUp
                                  ? "Зарегистрироваться"
                                  : "Войти"}
                        </Button>

                        {!isSignUp && (
                            <FormGroup>
                                Нужно зарегистрироваться?{" "}
                                <Link to="/register">
                                    Регистрируйтесь здесь
                                </Link>
                            </FormGroup>
                        )}

                        {isSignUp && (
                            <FormGroup>
                                Есть аккаунт?{" "}
                                <Link to="/login">Войдите здесь</Link>
                            </FormGroup>
                        )}
                    </Form>
                </ModalWrapper>
            </Modal>
        </Bg>
    );
};

export default AuthForm;
