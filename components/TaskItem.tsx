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
    // <li className="mb-4">
    //   <h3 className="font-bold">{task.title}</h3>
    //   <p>{task.description}</p>
    //   <span className="text-sm text-gray-500">Assigned to: {task.assignedTo}</span>
    //   <div className="flex gap-2 mt-2">
    //     <button
    //       onClick={() => onEdit(task)}
    //       className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    //     >
    //       Edit
    //     </button>
    //     <button
    //       onClick={() => onDelete(task.id)}
    //       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    //     >
    //       Delete
    //     </button>
    //   </div>
    // </li>

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
