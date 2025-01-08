"use client";
import React from "react";
import { Task, TaskFormProps, TaskStatus } from "@/app/types";
import { Formik } from "formik";
import InputField from "./InputField";
import validateTask from "./ValidateTask";
import TextareaField from "./TextAreaField";
import SelectField from "./SelectFileld";
import TaskFormFooter from "./TaskFormFooter";
import useTaskForm from "./useTaskHook";

// Main TaskForm Component
const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  onUpdateTask,
  editingTask,
  cancelEdit,
}) => {
  const { task, resetTask } = useTaskForm(editingTask ?? undefined);

  const handleSubmit = (values: Task) => {
    if (editingTask) {
      onUpdateTask?.(values);
    } else {
      onAddTask(values);
    }
    resetTask();
  };

  return (
    <Formik
      initialValues={task}
      enableReinitialize={true}
      validate={validateTask}
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
          <InputField
            id="title"
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Task Title"
            error={errors.title}
            touched={touched.title}
          />
          <TextareaField
            id="description"
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Task Description"
            error={errors.description}
            touched={touched.description}
          />
          <div className="flex justify-between gap-4">
            <InputField
              id="deadline"
              label="Deadline"
              name="deadline"
              value={values.deadline || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              error={errors.deadline}
              touched={touched.deadline}
            />
            <SelectField
              label="Status"
              value={values.status || TaskStatus.InProgress}
              onValueChange={(value: TaskStatus) =>
                handleChange({ target: { name: "status", value } })
              }
            />
          </div>
          <InputField
            id="assignedTo"
            label="Assigned To"
            name="assignedTo"
            value={values.assignedTo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Assign To"
            error={errors.assignedTo}
            touched={touched.assignedTo}
          />
          <TaskFormFooter
            isEditing={!!editingTask}
            isSubmitting={isSubmitting}
            cancelEdit={cancelEdit}
          />
        </form>
      )}
    </Formik>
  );
};

export default TaskForm;
