export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status?: TaskStatus;
  deadline?: string;
  postedAt?: string;
}
export interface BaseFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  error?: string;
  touched?: boolean;
}

// InputField-specific props
export interface InputFieldProps extends BaseFieldProps {
  type?: string; // Optional, specific to InputField
}

// TextAreaField-specific props can be added in the future if needed
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextAreaFieldProps extends BaseFieldProps {
  // No additional props for now
}

export enum TaskStatus {
  InProgress = 'InProgress',
  Completed = 'Completed',
  InReview = 'InReview',
  HighPriority = 'HighPriority',
  LowPriority = 'LowPriority',
  MediumPriority = 'MediumPriority',
}

export const STATUS_OPTIONS = [
  { value: "Completed", label: "Completed" },
  { value: "InReview", label: "In Review" },
  { value: "InProgress", label: "In Progress" },
  { value: "HighPriority", label: "High Priority" },
  { value: "LowPriority", label: "Low Priority" },
];

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

