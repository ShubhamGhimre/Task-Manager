"use client";
import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/app/types";

const TaskManager: React.FC = () => {
  const {  addTask, updateTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="max-w-2xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-4">Collaborative Task Manager</h1>

      <TaskForm
        onAddTask={addTask}
        onUpdateTask={updateTask}
        editingTask={editingTask}
        cancelEdit={() => setEditingTask(null)}
      />
    </div>
  );
};

export default TaskManager;
