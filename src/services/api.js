import axios from "axios";

const api = axios.create({
    baseURL: "https://wedev-api.sky.pro/api",
    headers: {
        "Content-Type": "",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const data = error.response.data;
            if (data?.message) return Promise.reject(data.message);
            if (error.response.status === 400)
                return Promise.reject("Неверные данные");
            if (error.response.status === 401)
                return Promise.reject("Необходима авторизация");

            return Promise.reject("Ошибка сервера");
        }

        return Promise.reject("Ошибка сети");
    },
);

export default api;
