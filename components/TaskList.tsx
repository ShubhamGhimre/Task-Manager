import React from "react";
import { Task } from "@/app/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  type?: "grid" | "list"; // Optional prop to control layout type
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  type = "grid",
}) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available. Start adding tasks!</p>
      ) : type === "grid" ? (
        <ul className="grid p-10 gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <ul className="list-none p-0">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm hover:bg-gray-100"
            >
              <div>
                <h4 className="font-semibold text-xl">{task.title}</h4>
                <p className="text-sm text-gray-500">{task.description}</p>
                <div className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "InProgress"
                        ? "bg-yellow-100 text-slate-500"
                        : task.status === "HighPriority"
                        ? "bg-red-400 text-white"
                        : task.status === "LowPriority"
                        ? "bg-yellow-500 text-slate-500"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status || "No status"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
