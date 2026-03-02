import api from "./api";

// получить все задачи
export const getTasks = async () => {
  const response = await api.get("/kanban");
  return response.data.tasks;
};

// получить задачу по id
export const getTaskById = async (id) => {
  const response = await api.get(`/kanban/${id}`);
  return response.data.task;
};

// добавить задачу
export const createTask = async (task) => {
  const response = await api.post("/kanban", task);
  return response.data.tasks;
};

// изменить задачу
export const updateTask = async (id, task) => {
  const response = await api.put(`/kanban/${id}`, task);
  return response.data.tasks;
};

// удалить задачу
export const deleteTask = async (id) => {
  const response = await api.delete(`/kanban/${id}`);
  return response.data.tasks;
};


