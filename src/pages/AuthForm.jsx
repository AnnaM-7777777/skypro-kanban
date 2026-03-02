import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

import {
    Bg,
    Modal,
    ModalWrapper,
    Title,
    Form,
    InputWrapper,
    Input,
    Button,
    FormGroup,
    ErrorText,
} from "./AuthForm.styled";

const AuthForm = ({ isSignUp }) => {
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const [loginValue, setLoginValue] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!loginValue || !password || (isSignUp && !name)) {
            setError("Заполните все поля");
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
        } catch {
            setError(
                "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Bg>
            <Modal>
                <ModalWrapper>
                    <Title>{isSignUp ? "Регистрация" : "Вход"}</Title>

                    <Form onSubmit={handleSubmit}>
                        <InputWrapper>
                            {isSignUp && (
                                <Input
                                    type="text"
                                    placeholder="Имя"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}

                            <Input
                                type="text"
                                placeholder="Логин"
                                value={loginValue}
                                onChange={(e) => setLoginValue(e.target.value)}
                                autoComplete="username"
                            />

                            <Input
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete={
                                    isSignUp
                                        ? "new-password"
                                        : "current-password"
                                }
                            />
                        </InputWrapper>

                        <Button type="submit" disabled={loading}>
                            {loading
                                ? "Загрузка..."
                                : isSignUp
                                  ? "Зарегистрироваться"
                                  : "Войти"}
                        </Button>

                        {error && <ErrorText>{error}</ErrorText>}

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
