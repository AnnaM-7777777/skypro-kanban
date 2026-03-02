import api from "./api";

// Авторизация
export const SignIn = async ({ login, password }) => {
    const response = await api.post("/user/login", {
        login,
        password,
    });

    return response.data.user;
};

// Регистрация
export const SignUp = async ({ login, password, name }) => {
    const response = await api.post("/user", {
        login,
        password,
        name,
    });

    return response.data.user;
};

// Список пользователей
export const getUsers = async () => {
    const response = await api.get("/user");
    return response.data.users;
};
