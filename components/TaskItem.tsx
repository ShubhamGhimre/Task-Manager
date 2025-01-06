import React from "react";
import { Task } from "@/app/types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <li className="mb-4">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <span className="text-sm text-gray-500">Assigned to: {task.assignedTo}</span>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
