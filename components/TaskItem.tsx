import React, { useState } from "react";
import { Task } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import TaskForm from "./TaskForm";
import { DialogDescription } from "@radix-ui/react-dialog";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {

  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span>Assigned to: {task.assignedTo}</span>
      </CardContent>
      <CardFooter className="flex gap-2">
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>You can Edit task from here </DialogDescription>
            </DialogHeader>
            <TaskForm
              onAddTask={() => {}}
              onUpdateTask={(updatedTask) => {
                onEdit(updatedTask);
                setDialogOpen(false); // Close dialog after update
              }}
              editingTask={task}
              cancelEdit={() => setDialogOpen(false)} // Cancel edit closes dialog
            />
          </DialogContent>
        </Dialog>
        <Button onClick={() => onDelete(task.id)} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
