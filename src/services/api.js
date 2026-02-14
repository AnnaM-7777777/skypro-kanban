import axios from "axios";

const API_BASE_URL = "https://wedev-api.sky.pro/api/words";

// Получение всех карточек
export async function fetchCards({ token }) {
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке карточек:", error);
        throw new Error(
            error.response?.data?.error ||
            error.message ||
            "Не удалось загрузить карточки"
        );
    }
}

// Создание новой карточки
export async function createCard({ token, card }) {
    try {
        const response = await axios.post(API_BASE_URL, card, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/html",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании карточки:", error);
        throw new Error(
            error.response?.data?.error ||
            error.message ||
            "Не удалось создать карточку"
        );
    }
}

// Получение карточки по ID
export async function fetchCardById({ token, id }) {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке карточки:", error);
        throw new Error(
            error.response?.data?.error ||
            error.message ||
            "Не удалось загрузить карточку"
        );
    }
}

// Обновление карточки
export async function updateCard({ token, id, card }) {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${id}`, card, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/html",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при обновлении карточки:", error);
        throw new Error(
            error.response?.data?.error ||
            error.message ||
            "Не удалось обновить карточку"
        );
    }
}

// Удаление карточки
export async function deleteCard({ token, id }) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при удалении карточки:", error);
        throw new Error(
            error.response?.data?.error ||
            error.message ||
            "Не удалось удалить карточку"
        );
    }
}