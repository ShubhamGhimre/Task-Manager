import { useState, useEffect } from "react";
import { Task, TaskStatus } from "@/app/types";

const useTaskForm = (editingTask?: Task) => {
  const date = new Date();
  
  const initialTaskState: Task = {
    id: 0,
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: TaskStatus.InProgress,
    postedAt: date.toISOString(),
  };

  const [task, setTask] = useState<Task>(initialTaskState);

  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);

  const resetTask = () => setTask(initialTaskState);

  return { task, setTask, resetTask };
};

export default useTaskForm;
