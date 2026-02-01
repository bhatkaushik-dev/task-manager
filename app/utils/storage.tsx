import { Task } from "./types";

const TASKS_KEY = "tasks";

export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(TASKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
