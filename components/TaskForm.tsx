"use client";
import React, { useState, useEffect } from "react";
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
  const date = new Date();
  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: TaskStatus.InProgress,
    postedAt: date.toISOString(),
  });

  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);

  const handleSubmit = (values: Task) => {
    if (editingTask) {
      onUpdateTask?.(values);
    } else {
      onAddTask(values);
    }
    setTask({
      id: 0,
      title: "",
      description: "",
      assignedTo: "",
      deadline: "",
      status: TaskStatus.InProgress,
      postedAt: new Date().toISOString(),
    });
  };

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (!values.title) errors.title = "Title is required";
          if (!values.description)
            errors.description = "Description is required";
          if (!values.assignedTo) errors.assignedTo = "Assigned to is required";

          if (values.deadline) {
            const currentDate = new Date();
            const deadline = new Date(values.deadline);
            if (deadline < currentDate)
              errors.deadline = "Deadline should be in the future";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
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
        }) => (
          <form
            onSubmit={handleSubmit}
            className="grid w-full items-center gap-4"
          >
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
                    handleChange({ target: { name: "status", value } })
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
    </div>
  );
};

export default TaskForm;
