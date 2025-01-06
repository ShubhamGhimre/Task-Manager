import React from "react";
import { Task } from "@/app/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
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
        <Button onClick={() => onEdit(task)} className="bg-green-500 hover:bg-green-600">
          Edit
        </Button>
        <Button onClick={() => onDelete(task.id)} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
