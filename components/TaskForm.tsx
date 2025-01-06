"use client";
import React, { useState, useEffect } from "react";
import { Task, TaskFormProps } from "@/app/types";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  onUpdateTask,
  editingTask,
  cancelEdit,
}) => {
  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    assignedTo: "",
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
      setTask({ id: 0, title: "", description: "", assignedTo: "" });
    }
  };

  return (
    // <Card className="w-[500px]">
    //   <CardHeader>
    //     <CardTitle>Create A Task</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //       <div className="grid w-full items-center gap-4">
    //         <div className="flex flex-col space-y-1.5">
    //           <Label htmlFor="Title">Title</Label>
    //           <Input
    //             type="text"
    //             id="name"
    //             placeholder="Title of your task"
    //             value={task.title}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className="flex flex-col space-y-1.5">
    //           <Label htmlFor="description">Description</Label>
    //           <Input
    //             type="text"
    //             id="description"
    //             placeholder="Description of your task"
    //             value={task.description}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div>
    //           <Label htmlFor="assignedTo">Assigned To</Label>
    //           <Input
    //             id="assignedTo"
    //             name="assignedTo"
    //             value={task.assignedTo}
    //             onChange={handleInputChange}
    //             type="text"
    //             placeholder="assigned to"
    //           />
    //         </div>
    //       </div>
    //   </CardContent>
    //   <CardFooter className="flex justify-between">
    //     <Button variant="add_button" onClick={handleSubmit}>
    //       {editingTask ? "Update Task" : "Add Task"}
    //     </Button>
    //     {editingTask && (
    //       <Button variant="cancel_button" onClick={cancelEdit}>
    //         Cancel
    //       </Button>
    //     )}
    //   </CardFooter>
    // </Card>

    
    <div className="mb-6">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" value={task.title} onChange={handleInputChange} type="text" />
      {/* <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleInputChange}
        className="block w-full mb-2 p-2 border rounded"
      /> */}
      <Label htmlFor="description">Description</Label>
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleInputChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <Label htmlFor="assignedTo">Assigned To</Label>
      <Input id="assignedTo" name="assignedTo" value={task.assignedTo} onChange={handleInputChange} type="text" />
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
