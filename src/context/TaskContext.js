import { createContext, useContext } from "react";

export const TaskContext = createContext(null);

export const useTasks = () => useContext(TaskContext);
