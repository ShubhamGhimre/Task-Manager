"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import TaskForm from "./TaskForm";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/app/types";
import { DialogDescription } from "@radix-ui/react-dialog";

const Navbar = () => {
  const { addTask, updateTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleAddTask = (task: Task) => {
    addTask(task);
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg w-full">
      <div className="text-white font-bold text-2xl flex items-center gap-2 cursor-pointer">
        <Link href="/" className="flex items-center gap-2 hover:text-gray-200">
          <Home size={24} /> Home
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link
          href="/tasks"
          className="text-white hover:text-gray-200 font-semibold"
        >
          View All Tasks
        </Link>
        <Link
          href="/login"
          className="text-white hover:text-gray-200 font-semibold"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="text-white hover:text-gray-200 font-semibold"
        >
          Sign Up
        </Link>

        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setDialogOpen(true)}>
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Fill in the form below to add a new task
              </DialogDescription>
            </DialogHeader>
            <TaskForm
              onAddTask={handleAddTask}
              onUpdateTask={updateTask}
              editingTask={editingTask}
              cancelEdit={() => setEditingTask(null)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
