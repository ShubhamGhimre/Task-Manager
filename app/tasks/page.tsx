// app/tasks/page.tsx
"use client";
import React from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskList from "@/components/TaskList";
import { Search } from "lucide-react";

const TasksPage: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold mb-4 text-center p-10 ">
        Task List
      </h2>

      {/* search and filter */}
      <div className="flex justify-between w-screen items-center p-4 px-[13%]">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-slate-700">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search Task"
            className="w-full pl-10 border-2 text-slate-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <select className="" name="filter" id="filter">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {deleteTask && (
        <TaskList
          tasks={tasks}
          onEdit={updateTask || (() => {})}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
};

export default TasksPage;
