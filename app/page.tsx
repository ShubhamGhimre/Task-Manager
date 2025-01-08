"use client";
import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { TaskStatus } from "./types";
import { DateTime } from "luxon";

const Page = () => {
  const { tasks, updateTask } = useTaskContext();

  const [groupedTasks, setGroupedTasks] = useState(() => ({
    [TaskStatus.Completed]: tasks.filter(
      (task) => task.status === TaskStatus.Completed
    ),
    [TaskStatus.InReview]: tasks.filter(
      (task) => task.status === TaskStatus.InReview
    ),
    [TaskStatus.InProgress]: tasks.filter(
      (task) => task.status === TaskStatus.InProgress
    ),
    [TaskStatus.HighPriority]: tasks.filter(
      (task) => task.status === TaskStatus.HighPriority
    ),
    [TaskStatus.LowPriority]: tasks.filter(
      (task) => task.status === TaskStatus.LowPriority
    ),
  }));

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: number,
    sourceStatus: TaskStatus
  ) => {
    event.dataTransfer.setData("taskId", taskId.toString());
    event.dataTransfer.setData("sourceStatus", sourceStatus);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Allow the drop operation
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    destinationStatus: TaskStatus
  ) => {
    event.preventDefault();
    const taskId = parseInt(event.dataTransfer.getData("taskId"));
    const sourceStatus = event.dataTransfer.getData(
      "sourceStatus"
    ) as TaskStatus;

    if (sourceStatus === destinationStatus) return;

    const taskToMove = groupedTasks[sourceStatus].find(
      (task) => task.id === taskId
    );
    if (!taskToMove) return;

    const updatedSourceTasks = groupedTasks[sourceStatus].filter(
      (task) => task.id !== taskId
    );
    const updatedDestinationTasks = [
      ...groupedTasks[destinationStatus],
      { ...taskToMove, status: destinationStatus },
    ];

    setGroupedTasks({
      ...groupedTasks,
      [sourceStatus]: updatedSourceTasks,
      [destinationStatus]: updatedDestinationTasks,
    });

    if (updateTask) {
      updateTask({ ...taskToMove, status: destinationStatus });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Task List</h2>

      <div className="grid grid-cols-5 gap-10 h-screen">
        {Object.entries(groupedTasks).map(([status, filteredTasks]) => (
          <div
            key={status}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, status as TaskStatus)}
            className="p-10 rounded-lg shadow-md bg-gray-100"
          >
            <h3 className="text-xl font-semibold mb-4 text-center capitalize">
              {status.replace(/([A-Z])/g, " $1")}
            </h3>
            {filteredTasks.length > 0 ? (
              <div>
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, task.id, status as TaskStatus)
                    }
                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-move"
                  >
                    <h4 className="font-semibold text-xl text-gray-800">
                      {task.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {task.description}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium mr-2">Assigned to:</span>
                        <span className="text-gray-800">{task.assignedTo}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium mr-2">Deadline:</span>
                        <span className="text-gray-800">
                          {task.deadline || "No deadline set"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium mr-2">Posted At:</span>
                        <span className="text-gray-800">
                          {task.postedAt
                            ? DateTime.fromISO(task.postedAt).toLocaleString(
                                DateTime.DATETIME_MED
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No tasks available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
