import { nanoid } from "nanoid";
import { useState } from "react";
import { Task } from "../utils/types";

const TaskForm = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: nanoid(),
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
    setInput({ title: "", description: "" });
  };

  return (
    <section
      className="
  bg-[#f7f6f2]/90 backdrop-blur-sm
  border border-[#cfc7a3]
  rounded-2xl shadow-sm p-6 max-h-72
"
    >
      <h2 className="text-xl font-semibold mb-4 text-[#FCAB10]">Create Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded-md border border-[#DBD5B5]  p-2 focus:ring-2 focus:ring-[#DBD5B5]"
          placeholder="Task title"
          value={input.title}
          onChange={(e) => setInput({ ...input, title: e.target.value })}
        />

        <textarea
          className="w-full rounded-md border border-[#DBD5B5]  p-2 focus:ring-2 focus:ring-[#DBD5B5]"
          placeholder="Task description"
          value={input.description}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
        />

        <button
          disabled={!input.title || !input.description}
          className="w-full bg-[#2B9EB3] text-white py-2 rounded-md hover:opacity-90 cursor-pointer disabled:opacity-50"
        >
          Add Task
        </button>
      </form>
    </section>
  );
};

export default TaskForm;
