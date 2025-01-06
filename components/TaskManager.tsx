"use client";
import React from "react";
import TaskForm from "./TaskForm";
// import TaskList from "./TaskList";
// import { Task } from "@/app/types";
import { useTaskContext } from "@/context/TaskContext";
// import TaskList from "./TaskList";

const TaskManager: React.FC = () => {
  const { addTask } = useTaskContext();
  // const [tasks, setTasks] = useState<Task[]>([]);
  // const [editingTask, setEditingTask] = useState<Task | null>(null);

  // const addTask = (task: Task) => {
  //   setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  // };

  // const updateTask = (updatedTask: Task) => {
  //   setTasks(
  //     tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
  //   );
  //   setEditingTask(null);
  // };

  // const deleteTask = (taskId: number) => {
  //   setTasks(tasks.filter((task) => task.id !== taskId));
  // };

  return (
    <div className="max-w-2xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-4">Collaborative Task Manager</h1>

      <TaskForm
        onAddTask={addTask}
        // onUpdateTask={updateTask}
        // editingTask={editingTask}
        // cancelEdit={() => setEditingTask(null)}
      />

      {/* <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={deleteTask} /> */}
    </div>
  );
};

export default TaskManager;
