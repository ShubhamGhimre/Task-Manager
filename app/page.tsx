"use client";
import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { TaskStatus } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import calculateDueDate from "@/lib/deadlineCalculation";
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

  // calculate days until deadline

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Task List</h2>

      <div className="grid grid-cols-5 gap-10 h-screen">
        {Object.entries(groupedTasks).map(([status, filteredTasks]) => (
          <Card
            key={status}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, status as TaskStatus)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 "
          >
            <h3 className="text-xl font-semibold mb-4 text-center capitalize">
              {status.replace(/([A-Z])/g, " $1")}
            </h3>
            {filteredTasks.length > 0 ? (
              <>
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, task.id, status as TaskStatus)
                    }
                    className=" p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-move relative my-3"
                  >
                    <CardHeader>
                      <CardTitle className="text-3xl font-semibold text-gray-800 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        {task.title}
                      </CardTitle>
                      <CardDescription className="text-md text-gray-600 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {task.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 space-y-4">
                      <div className="text-gray-700">
                        <span className="font-medium">Assigned to:</span>{" "}
                        {task.assignedTo}
                      </div>
                      <span
                        className={`${
                          calculateDueDate(task.deadline || null) ===
                          "Deadline passed"
                            ? "text-red-600"
                            : "bg-gray-500 text-white rounded-full px-2 py-1 absolute right-2 top-0"
                        }`}
                      >
                        {calculateDueDate(task.deadline || null)}
                      </span>
                      <div className="text-gray-700">
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : task.status === "InProgress"
                              ? "bg-yellow-100 text-slate-500"
                              : task.status === "HighPriority"
                              ? "bg-red-400 text-white"
                              : task.status === "LowPriority"
                              ? "bg-yellow-500 text-slate-500"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {task.status || "No status"}
                        </span>
                      </div>
                      <div className="text-gray-700">
                        <span className="font-medium">Posted At:</span>{" "}
                        <span
                          className="text-gray-800"
                          title={
                            task.postedAt
                              ? DateTime.fromISO(task.postedAt).toLocaleString(
                                  DateTime.DATETIME_FULL
                                )
                              : "N/A"
                          }
                        >
                          {task.postedAt
                            ? DateTime.fromISO(task.postedAt).toRelative({
                                locale: "en",
                              }) // Relative time
                            : "N/A"}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-gray-500 text-center">No tasks available</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
