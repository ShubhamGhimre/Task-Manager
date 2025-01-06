"use client";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import React, { useEffect, useState } from "react";
import { Task } from "../types";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const onEdit = (task: Task) => {
    setEditingTask(task); 
  };

  const onDelete = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const onAddTask = (task: Task) => {
    const updatedTasks = [...tasks, { ...task, id: Date.now() }];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const onUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setEditingTask(null);
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div>
      {editingTask ? (
        <TaskForm
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          editingTask={editingTask}
          cancelEdit={cancelEdit}
        />
      ) : (
        <TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
};

export default Page;
