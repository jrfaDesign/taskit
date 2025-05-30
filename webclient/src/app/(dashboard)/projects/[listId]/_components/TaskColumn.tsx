import React from "react";
import TaskItem from "./TaskItem";
import { TaskProps } from "@/types/Tasks";
import { ColumnsId, formatSecondsToReadable } from "../utils";

import { Progress } from "@/components/ui/progress";

import classNames from "classnames";

type TaskColumnProps = {
  columnId: ColumnsId;
  title: string;
  tasks: TaskProps[];
};
const TaskColumn = ({ columnId, title, tasks }: TaskColumnProps) => {
  const completedCount = tasks.filter(task => task.completedAt).length;
  const totalCount = tasks.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const totalEstimatedTime = tasks.reduce((total, task) => {
    return total + (task.estimatedTime ?? 0);
  }, 0);

  return (
    <div
      className={classNames(
        "flex flex-1 border-2 p-2 py-2 flex-col min-w-[320px] rounded-xl bg-card shadow",
        {
          "border-primary": columnId === "today",
          "border-destructive": columnId === "overdue",
        }
      )}
    >
      <div className="flex flex-row items-center justify-between px-2 mb-2">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-stone-400">
          {formatSecondsToReadable(totalEstimatedTime)}
        </div>
      </div>

      <div className="flex flex-row items-center gap-x-2 whitespace-nowrap px-2 mb-3">
        <Progress value={progress} className="flex-1" />
        <div className="text-xs text-stone-400">
          {`${tasks.filter(task => task.completedAt).length}/${
            tasks.length
          } Done`}
        </div>
      </div>

      <div className=" flex-1 overflow-y-auto space-y-3 pl-2 pr-2 ">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      <button className="mt-4 w-full text-sm text-center text-blue-500 hover:underline">
        + Add task
      </button>
    </div>
  );
};

export default TaskColumn;
