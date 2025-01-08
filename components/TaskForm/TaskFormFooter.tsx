import React from 'react'
import { Button } from '../ui/button';

// Reusable TaskFormFooter Component
const TaskFormFooter: React.FC<{
  isEditing: boolean;
  isSubmitting: boolean;
  cancelEdit?: () => void;
}> = ({ isEditing, isSubmitting, cancelEdit }) => (
  <div className="flex gap-2 mt-4 items-center justify-between">
    <Button type="submit" disabled={isSubmitting}>
      {isEditing ? "Update Task" : "Add Task"}
    </Button>
    {isEditing && (
      <Button variant="cancel_button" onClick={cancelEdit}>
        Cancel
      </Button>
    )}
  </div>
);

export default TaskFormFooter