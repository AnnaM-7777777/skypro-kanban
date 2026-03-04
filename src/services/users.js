import api from "./api";
import { getUsers } from "../services/users";

/**
 * Получить список всех пользователей
 * @returns {Promise<Array>} - Массив пользователей
 */
export const getUsers = async () => {
    const response = await api.get("/user");
    return response.data.users;
};

/**
 * Обновить данные пользователя (опционально, если нужно)
 * @param {string} id - ID пользователя
 * @param {Object} userData - Данные для обновления
 * @returns {Promise<Object>} - Обновлённый пользователь
 */
export const updateUser = async (id, userData) => {
    const response = await api.put(`/user/${id}`, userData);
    return response.data.user;
};

/**
 * Удалить пользователя (опционально, если нужно)
 * @param {string} id - ID пользователя
 * @returns {Promise<boolean>} - Успех удаления
 */
export const deleteUser = async (id) => {
    await api.delete(`/user/${id}`);
    return true;
};