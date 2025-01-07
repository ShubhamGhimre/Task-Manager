"use client";
import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskList from "@/components/TaskList";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TasksPage: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "ALL" || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold mb-4 text-center p-10">Task List</h2>

      {/* Search and Filter */}
      <div className="flex justify-between w-screen items-center p-4 px-[13%]">
        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="absolute left-3 text-slate-700">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search Task"
            className="w-full pl-10 border-2 text-slate-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div>
          <Select onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ALL" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="InReview">InReview</SelectItem>
              <SelectItem value="InProgress">InProgress</SelectItem>
              <SelectItem value="HighPriority">HighPriority</SelectItem>
              <SelectItem value="LowPriority">LowPriority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <TaskList
          tasks={filteredTasks}
          onEdit={updateTask || (() => {})}
          onDelete={deleteTask || (() => {})}
        />
      ) : (
        <p className="text-center text-lg mt-10">No tasks available</p>
      )}
    </div>
  );
};

export default TasksPage;
