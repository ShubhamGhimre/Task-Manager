export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status?: TaskStatus;
  deadline?: string;
  postedAt?: string;
}

export enum TaskStatus {
  InProgress = 'InProgress',
  Completed = 'Completed',
  InReview = 'InReview',
  HighPriority = 'HighPriority',
  LowPriority = 'LowPriority',
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