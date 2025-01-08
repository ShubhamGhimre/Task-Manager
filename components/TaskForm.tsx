"use client";
import React from "react";
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

const ErrorMessage: React.FC<{ error?: string; touched?: boolean }> = ({ error, touched }) => {
  if (!error || !touched) return null;
  return <span className="text-red-500 text-sm mt-1">{error}</span>;
};

const validateTaskForm = (values: Task) => {
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
};

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

  const renderInputField = (
    id: string,
    label: string,
    value: string | undefined,
    handleChange: (e: React.ChangeEvent<any>) => void,
    handleBlur: (e: React.FocusEvent<any>) => void,
    error?: string,
    touched?: boolean,
    type: string = "text",
    placeholder?: string,
    additionalClass?: string
  ) => (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        value={value || ""} // Ensure the value is always a string
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
        placeholder={placeholder}
        className={`${
          error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } ${additionalClass || ""}`}
      />
      <ErrorMessage error={error} touched={touched} />
    </div>
  );
  

  return (
    <Formik
      initialValues={editingTask || initialTask}
      enableReinitialize={true}
      validate={validateTaskForm}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (editingTask) {
          onUpdateTask?.(values);
        } else {
          onAddTask(values);
        }
        resetForm();
        setSubmitting(false);
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
          {renderInputField(
            "title",
            "Title",
            values.title,
            handleChange,
            handleBlur,
            errors.title,
            touched.title,
            "text",
            "Task Title"
          )}

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
              className={`block w-full mb-2 p-2 border rounded ${
                errors.description && touched.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <ErrorMessage error={errors.description} touched={touched.description} />
          </div>

          {/* Deadline and Status */}
          <div className="flex justify-between gap-4">
            {renderInputField(
              "deadline",
              "Deadline",
              values.deadline,
              handleChange,
              handleBlur,
              errors.deadline,
              touched.deadline,
              "date",
              undefined,
              "w-[180px]"
            )}

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
          {renderInputField(
            "assignedTo",
            "Assigned To",
            values.assignedTo,
            handleChange,
            handleBlur,
            errors.assignedTo,
            touched.assignedTo,
            "text",
            "Assign To"
          )}

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
