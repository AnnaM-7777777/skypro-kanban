import api from "./api";

/**
 * Авторизация пользователя
 * @param {Object} credentials
 * @param {string} credentials.login
 * @param {string} credentials.password
 * @returns {Promise<Object>}
 */
export const SignIn = async ({ login, password }) => {
    const response = await api.post("/user/login", {
        login,
        password,
    });
    return response.data.user;
};

/**
 * Регистрация нового пользователя
 * @param {Object} userData
 * @param {string} userData.login
 * @param {string} userData.password
 * @param {string} userData.name
 * @returns {Promise<Object>}
 */
export const SignUp = async ({ login, password, name }) => {
    const response = await api.post("/user", {
        login,
        password,
        name,
    });
    return response.data.user;
};