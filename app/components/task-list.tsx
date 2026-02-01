"use client";
import { useState } from "react";
import { groupByDate } from "../utils/group-by-date";
import { Task } from "../utils/types";
import Toggle from "./toggle";

const TaskList = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const groupedTasks = groupByDate(tasks);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <section
      className="
        md:col-span-2
        bg-[#f7f6f2]/90 backdrop-blur-sm
        border border-[#cfc7a3]
        rounded-2xl shadow-sm
        p-6 max-h-[75vh] flex flex-col
      "
    >
      <h2 className="text-xl text-[#fcab10] font-semibold mb-4">Tasks</h2>

      {Object.keys(groupedTasks).length === 0 && (
        <p className="text-gray-500">No tasks yet.</p>
      )}

      <div className="overflow-y-auto pr-2 flex-1">
        {Object.entries(groupedTasks).map(([date, tasks]) => (
          <div key={date} className="mb-6">
            <h3 className="text-sm font-semibold mb-3">{date}</h3>

            <ul className="space-y-3">
              {tasks.map((task) => {
                const isExpanded = expandedId === task.id;

                return (
                  <li
                    key={task.id}
                    onClick={() =>
                      setExpandedId(isExpanded ? null : task.id)
                    }
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-l-4
                      ${
                        task.completed
                          ? "bg-green-50 border-green-400"
                          : "bg-yellow-50 border-yellow-400"
                      }
                      ${
                        isExpanded
                          ? "scale-[1.01] shadow-md"
                          : "hover:shadow-md hover:scale-[1.005]"
                      }
                    `}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4
                          className={`text-sm font-bold tracking-wide uppercase ${
                            task.completed
                              ? "line-through opacity-60"
                              : ""
                          }`}
                        >
                          {task.title}
                        </h4>

                        <p className="text-xs mt-1 leading-relaxed">
                          {task.description}
                        </p>

                        {isExpanded && (
                          <div className="mt-3 text-[11px] space-y-1">
                            <p>
                               Created at{" "}
                              <span className="font-medium">
                                {new Date(task.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </span>
                            </p>

                            <p>
                             Status{" "}
                              <span
                                className={`font-medium ${
                                  task.completed
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {task.completed ? "Completed" : "Pending"}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>

                      <div
                        className="flex flex-col items-end gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Toggle
                          checked={task.completed}
                          onChange={() => toggleStatus(task.id)}
                        />

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-[11px] bg-[#f8333c] text-white px-3 py-1 rounded-lg hover:opacity-90 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {totalTasks > 0 && (
        <div className="
          mt-4 pt-3
          border-t border-[#cfc7a3]
          text-xs flex justify-between items-center
         =
        ">
          <span>
            Total: <span className="font-medium">{totalTasks}</span>
          </span>

          <div className="flex gap-4">
            <span className="text-green-600">
              Completed:{" "}
              <span className="font-medium">{completedTasks}</span>
            </span>
            <span className="text-yellow-600">
              Pending:{" "}
              <span className="font-medium">{pendingTasks}</span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskList;
