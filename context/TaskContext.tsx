"use client";

import { Task, TaskContextType } from "@/app/types";
import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast"

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast()

  const [tasks, setTasks] = useState<Task[]>([]);

  // const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // // Fetch tasks from the API
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get(API_URL);
  //       setTasks(response.data); // Assuming the API response is an array of tasks
  //     } catch (error) {
  //       console.error("Error fetching tasks", error);
  //       toast({
  //         title: "Error fetching tasks",
  //       });

  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // // Add a task (POST request)
  // const addTask = async (task: Task) => {
  //   try {
  //     const response = await axios.post(API_URL, task);
  //     setTasks((prev) => [...prev, response.data]); // Add the newly created task from the response
  //     toast({
  //       title: "Task added successfully",
  //     });
  //   } catch (error) {
  //    console.error("Error adding task", error);
  //    toast({
  //     title: "Error addmin task",
  //    })
  //   }
  // };

  // // Update a task (PUT request)
  // const updateTask = async (updatedTask: Task) => {
  //   try {
  //     const response = await axios.patch(`${API_URL}/${updatedTask.id}`, updatedTask);
  //     setTasks((prev) =>
  //       prev.map((task) => (task.id === updatedTask.id ? response.data : task))
  //     ); // Replace the updated task in the state
  //     toast({
  //       title: "Task updated successfully",
  //     });
  //   } catch (error) {
  //    console.error("Error updating task", error);
  //    toast({
  //     title: "Error updating task",
  //    })
  //   }
  // };

  // // Delete a task (DELETE request)
  // const deleteTask = async (taskId: number) => {
  //   try {
  //     await axios.delete(`${API_URL}/${taskId}`);
  //     setTasks((prev) => prev.filter((task) => task.id !== taskId));
  //     toast({
  //       title: "Task deleted successfully",
  //     });
  //   } catch (error) {
  //     console.error("Error deleting task", error);
  //     toast({
  //       title: "Error deleting task",
  //     });
  //   }
  // };


  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, { ...task, id: prev.length + 1 }]);
    toast({
      title: "Added Sucessfully",
    })

  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    toast({
      title: "Updated Sucessfully",
    })

  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast({
      title: "Deleted Sucessfully",
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
