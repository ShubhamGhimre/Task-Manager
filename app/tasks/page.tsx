// app/tasks/page.tsx
"use client";
import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/app/types";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const TasksPage: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center p-10">
        {editingTask && (
          <TaskForm
            onAddTask={() => {}}
            onUpdateTask={updateTask}
            editingTask={editingTask}
            cancelEdit={() => setEditingTask(null)}
          />
        )}
      </div>

      {/* <ul className="list-disc pl-6 mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p>{task.description}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask && deleteTask(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul> */}

      {deleteTask && (
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} />
      )}
    </div>
  );
};

export default TasksPage;
