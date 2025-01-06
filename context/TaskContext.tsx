"use client";

import { Task, TaskContextType } from "@/app/types";
import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, { ...task, id: prev.length + 1 }]);
    toast({
      title: "Added Sucessfully .",
    })

  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    toast({
      title: "Updated Sucessfully .",
    })
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast({
      title: "Deleted Sucessfully .",
    })
  };

//   console.log(tasks);
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
