import { Task } from "@/app/types";

// Centralized Validation Logic

const validateTask = (values: Task) => {
  const errors: { [key: string]: string } = {};
  if (!values.title) errors.title = "Title is required";
  if (!values.description) errors.description = "Description is required";
  if (!values.assignedTo) errors.assignedTo = "Assigned to is required";

  if (values.deadline) {
    const currentDate = new Date();
    const deadline = new Date(values.deadline);
    if (deadline < currentDate)
      errors.deadline = "Deadline should be in the future";
  }
  return errors;
};

export default validateTask;