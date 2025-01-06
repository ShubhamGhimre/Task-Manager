export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask?: (task: Task) => void;
  deleteTask?: (taskId: number) => void;
}
