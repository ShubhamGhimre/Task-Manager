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
      <h2 className="text-3xl font-semibold mb-4 text-center p-10 ">Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Start adding tasks!</p>
      ) : (
        <ul className="grid px-10 py-5 gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
