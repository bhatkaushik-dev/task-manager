import { Task } from "./types";

export const groupByDate = (tasks: Task[]) => {
  return tasks.reduce<Record<string, Task[]>>((acc, task) => {
    const date = new Date(task.createdAt).toDateString();
    acc[date] = acc[date] || [];
    acc[date].push(task);
    return acc;
  }, {});
};
