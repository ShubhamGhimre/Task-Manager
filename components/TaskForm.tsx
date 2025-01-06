'use client';
import React, { useState, useEffect } from "react";
import { Task } from "@/app/types";
import { Button } from "./ui/button";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  editingTask: Task | null;
  cancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onUpdateTask, editingTask, cancelEdit }) => {
  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    assignedTo: "",
  });

  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (task.title && task.description && task.assignedTo) {
      if (editingTask) {
        onUpdateTask(task);
      } else {
        onAddTask(task);
      }
      setTask({ id: 0, title: "", description: "", assignedTo: "" });
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleInputChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleInputChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="assignedTo"
        placeholder="Assigned To"
        value={task.assignedTo}
        onChange={handleInputChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <div className="flex gap-2">  
        <Button variant="add_button" onClick={handleSubmit} >
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
        {editingTask && (
          <Button variant="cancel_button" onClick={cancelEdit} >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
