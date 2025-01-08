"use client";
import React, { useEffect } from "react";
import { Task, TaskFormProps, TaskStatus } from "@/app/types";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Formik } from "formik";

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  onUpdateTask,
  editingTask,
  cancelEdit,
}) => {
  const initialTask = {
    id: 0,
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: TaskStatus.InProgress,
    postedAt: new Date().toISOString(),
  };

  return (
    <Formik
      initialValues={editingTask || initialTask}
      enableReinitialize={true} // Automatically updates form values when `editingTask` changes
      validate={(values) => {
        const errors: { [key: string]: string } = {};
        if (!values.title) errors.title = "Title is required";
        if (!values.description) errors.description = "Description is required";
        if (!values.assignedTo) errors.assignedTo = "Assigned to is required";
        if (values.deadline) {
          const currentDate = new Date();
          const deadlineDate = new Date(values.deadline);
          if (deadlineDate < currentDate) {
            errors.deadline = "Deadline must be in the future";
          }
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (editingTask) {
          onUpdateTask?.(values);
        } else {
          onAddTask(values);
        }
        resetForm(); // Reset form fields after submission
        setSubmitting(false); // Stop the submitting state
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
          {/* Title */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Task Title"
            />
            {errors.title && touched.title && (
              <span className="text-red-500">{errors.title}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Task Description"
              className="block w-full mb-2 p-2 border rounded"
            />
            {errors.description && touched.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </div>

          {/* Deadline and Status */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                value={values.deadline}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
                className="w-[180px]"
              />
              {errors.deadline && touched.deadline && (
                <span className="text-red-500">{errors.deadline}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                value={values.status}
                onValueChange={(value: TaskStatus) =>
                  setFieldValue("status", value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="InReview">In Review</SelectItem>
                  <SelectItem value="InProgress">In Progress</SelectItem>
                  <SelectItem value="HighPriority">High Priority</SelectItem>
                  <SelectItem value="LowPriority">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assigned To */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Input
              id="assignedTo"
              name="assignedTo"
              value={values.assignedTo}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Assign To"
              type="text"
            />
            {errors.assignedTo && touched.assignedTo && (
              <span className="text-red-500">{errors.assignedTo}</span>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-2 mt-4 items-center justify-between">
            <Button type="submit" disabled={isSubmitting}>
              {editingTask ? "Update Task" : "Add Task"}
            </Button>
            {editingTask && (
              <Button variant="cancel_button" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default TaskForm;
