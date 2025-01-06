/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import TaskList from "@/components/TaskList";
import { useTaskContext } from "@/context/TaskContext";


const page = () => {
  const { tasks } = useTaskContext();

  return (
    <div>
      <TaskList tasks={tasks} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
};

export default page;
