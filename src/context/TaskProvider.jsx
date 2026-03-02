import { useState, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import { getTasks, createTask, updateTask, deleteTask } from "../services/kanban";
import { useAuth } from "./useAuth";

export const TaskProvider = ({ children }) => {
  const { isAuth } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка задач при авторизации
  useEffect(() => {
    if (!isAuth) {
      setTasks([]);
      return;
    }

    const fetchTasks = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError("Ошибка загрузки задач");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [isAuth]);

  // Добавление новой задачи
  const addTask = async (task) => {
    try {
      setError(null);
      setIsLoading(true);

      const updatedTasks = await createTask(task);
      setTasks(
        updatedTasks.slice().sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        )
      );

      return true; 
    } catch {
      setError("Ошибка добавления задачи");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Редактирование задачи
  const editTask = async (id, updatedTask) => {
    try {
      setError(null);
      setIsLoading(true);

      const updatedTasks = await updateTask(id, updatedTask);
      setTasks(updatedTasks);

      return true;
    } catch {
      setError("Ошибка редактирования задачи");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Удаление задачи
  const removeTask = async (id) => {
    try {
      setError(null);
      setIsLoading(true);

      const updatedTasks = await deleteTask(id);
      setTasks(updatedTasks);

      return true;
    } catch {
      setError("Ошибка удаления задачи");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, isLoading, error, addTask, editTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};