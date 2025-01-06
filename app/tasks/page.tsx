/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import TaskList from "@/components/TaskList";
import React, { useState } from "react";
import { Task } from "../types";

const page = () => {

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1, title: "Task 1", description: "Description for Task 1",
      assignedTo: "shuv"
    },
    {
      id: 2, title: "Task 2", description: "Description for Task 2",
      assignedTo: "shuv"
    },
    {
      id: 3, title: "Task 3", description: "Description for Task 3",
      assignedTo: "shuv"
    },
  ]);

  const onEdit = (task: Task) => {
    console.log("Edit task:", task);
    // Add edit functionality here (e.g., navigate to a form or open a modal)
  };

  const onDelete = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

 
  return (
    <div>
      <TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default page;
