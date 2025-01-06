import React from "react";
import { Task } from "@/app/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Start adding tasks!</p>
      ) : (
        <ul className="list-disc pl-6">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
