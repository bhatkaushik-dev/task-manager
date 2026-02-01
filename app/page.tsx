"use client";

import { useEffect, useState } from "react";
import TaskForm from "./components/task-form";
import TaskList from "./components/task-list";
import { loadTasks, saveTasks } from "./utils/storage";
import { Task } from "./utils/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <main className="min-h-screen bg-linear-to-br from-[#dbd5b5] to-[#b6ad90] p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#2b9eb3]">
        Task Manager
      </h1>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskForm setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </main>
  );
}
