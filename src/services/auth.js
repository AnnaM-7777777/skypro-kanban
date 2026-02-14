import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export const getToken = () => {
    return localStorage.getItem("token");
};

export async function signIn({ login, password }) {
    try {
        const response = await axios.post(
            API_URL + "/login",
            { login, password },
            {
                headers: {
                    "Content-Type": "",
                },
            },
        );
        return response.data; // ← { user: { token, name, ... } }
    } catch (error) {
        console.error("❌ Ошибка:", error.response?.data);
        throw new Error(error.response?.data?.error || "Ошибка авторизации");
    }
}

export async function signUp({ name, login, password }) {
    try {
        const response = await axios.post(
            API_URL,
            { name, login, password },
            {
                headers: {
                    "Content-Type": "",
                },
            },
        );
        return response.data; // ← { user: { token, name, ... } }
    } catch (error) {
        console.error("❌ Ошибка регистрации:", error.response?.data);
        throw new Error(error.response?.data?.error || "Ошибка регистрации");
    }
}
