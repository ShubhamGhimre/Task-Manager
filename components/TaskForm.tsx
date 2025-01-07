"use client";
import React, { useState, useEffect } from "react";
import { Task, TaskFormProps } from "@/app/types";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  onUpdateTask,
  editingTask,
  cancelEdit,
}) => {
  const date = new Date();
  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: "InProgress",
    postedAt: date.toISOString(),
  });

  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (task.title && task.description && task.assignedTo) {
      if (editingTask) {
        onUpdateTask?.(task);
      } else {
        onAddTask(task);
      }
      setTask({
        id: 0,
        title: "",
        description: "",
        assignedTo: "",
        deadline: "",
        status: "InProgress",
        postedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            type="text"
            placeholder="Task Title"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border rounded"
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              className="w-[180px]"
              id="deadline"
              name="deadline"
              value={task.deadline}
              onChange={handleInputChange}
              type="date"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
            value={task.status}
            onValueChange={(value) => setTask({ ...task, status: value })}
            >
              <SelectTrigger className="w-[180px]" >
                <SelectValue placeholder="Status"  />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="InReview">InReview</SelectItem>
                <SelectItem value="InProgress">InProgress</SelectItem>
                <SelectItem value="HighPriority">HighPriority</SelectItem>
                <SelectItem value="LowPriority">LowPriority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            name="assignedTo"
            value={task.assignedTo}
            onChange={handleInputChange}
            placeholder="Assign To"
            type="text"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4 items-center justify-between">
        <Button variant="add_button" onClick={handleSubmit}>
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
        {editingTask && (
          <Button variant="cancel_button" onClick={cancelEdit}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
