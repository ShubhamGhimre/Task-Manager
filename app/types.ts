export interface User {
  name: string;
  email: string;
  role: string;
  password: string;
}
export interface Task {
  title: string;
  description: string;
  assignedTo: string;
  status?: TaskStatus;
  priority?: PriorityStatus;
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
  // HighPriority = 'HighPriority',
  // LowPriority = 'LowPriority',
  // MediumPriority = 'MediumPriority',
}

export enum PriorityStatus{
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export const STATUS_OPTIONS = [
  { value: "Completed", label: "Completed" },
  { value: "In Review", label: "In Review" },
  { value: "In Progress", label: "In Progress" },
  { value: "High Priority", label: "High Priority" },
  { value: "Low Priority", label: "Low Priority" },
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

