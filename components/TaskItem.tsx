"use client";
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
import TaskForm from "./TaskForm/TaskForm";
import { DialogDescription } from "@radix-ui/react-dialog";
import { DateTime } from "luxon";
import calculateDueDate from "@/lib/deadlineCalculation";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Card className=" relative w-[350px] rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Card Header */}
      <CardHeader className="p-6 rounded-t-lg ">
        <CardTitle className="text-3xl font-semibold text-gray-800 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {task.title}
        </CardTitle>
        <CardDescription className="text-md text-gray-600 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {task.description}
        </CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-6 space-y-4">
        <div className="text-gray-700">
          <span className="font-medium">Assigned to:</span> {task.assignedTo}
        </div>
        <span
          className={`${
            calculateDueDate(task.deadline || null) === "Deadline passed"
              ? "text-red-600"
              : "bg-gray-500 px-2 py-1 rounded-full text-white absolute  -top-3 right-2"
          }`}
        >
          {calculateDueDate(task.deadline || null)}
        </span>
        <div className="text-gray-700">
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              task.status === "Completed"
                ? "bg-green-100 text-green-700"
                : task.status === "InProgress"
                ? "bg-yellow-100 text-slate-500"
                : task.status === "HighPriority"
                ? "bg-red-400 text-white"
                : task.status === "LowPriority"
                ? "bg-yellow-500 text-slate-500"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {task.status || "No status"}
          </span>
        </div>
        <div className="text-gray-700">
          <span className="font-medium">Posted At:</span>{" "}
          <span
            className="text-gray-800"
            title={
              task.postedAt
                ? DateTime.fromISO(task.postedAt).toLocaleString(
                    DateTime.DATETIME_FULL
                  )
                : "N/A"
            }
          >
            {task.postedAt
              ? DateTime.fromISO(task.postedAt).toRelative({ locale: "en" }) // Relative time
              : "N/A"}
          </span>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-6 flex justify-between  bg-gray-50 rounded-b-lg">
        {/* Edit Button with Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Edit Task</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Update the task details using the form below.
              </DialogDescription>
            </DialogHeader>
            <TaskForm
              onAddTask={() => {}} // Placeholder, not used here
              onUpdateTask={(updatedTask) => {
                onEdit(updatedTask); // Call onEdit with updated task
                setDialogOpen(false); // Close the dialog
              }}
              editingTask={task} // Pass current task to edit
              cancelEdit={() => setDialogOpen(false)} // Close on cancel
            />
          </DialogContent>
        </Dialog>

        {/* Delete Button */}
        <Button
          onClick={() => onDelete(task.id)}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
