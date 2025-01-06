export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask?: (updatedtask: Task) => void;
  deleteTask?: (taskId: number) => void;
}

export interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onUpdateTask?: (task: Task) => void;
  editingTask?: Task | null;
  cancelEdit?: () => void;
}