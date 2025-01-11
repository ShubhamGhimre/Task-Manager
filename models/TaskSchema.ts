import mongoose, { Schema, Document, Model } from 'mongoose';

export enum TaskStatus {
  InProgress = 'InProgress',
  Completed = 'Completed',
  InReview = 'InReview',
}

export enum PriorityStatus {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: string;
  status: TaskStatus;
  priority: PriorityStatus;
  deadline?: Date;
  postedAt?: Date;
}

const TaskSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.InProgress,
  },
  priority: {
    type: String,
    enum: Object.values(PriorityStatus),
    default: PriorityStatus.Medium,
  },
  deadline: { type: Date },
  postedAt: { type: Date, default: Date.now },
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
