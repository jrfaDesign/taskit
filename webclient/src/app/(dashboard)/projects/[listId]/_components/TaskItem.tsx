"use client";

import { TaskProps } from "@/types/Tasks";
import React from "react";
import { formatSecondsToReadable } from "../utils";

import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TaskItemProps {
  task: TaskProps;
}
const TaskItem = ({ task }: TaskItemProps) => {
  const {
    id,
    completedAt,
    title,
    subtasks,
    expendedTime,
    estimatedTime,
    //  priority,
    project,
  } = task;

  return (
    <div
      onClick={() => console.log(id)}
      className={`flex flex-col gap-1 cursor-grab p-3 rounded-md shadow-sm border bg-muted select-none transition-smooth hover:border-primary `}
    >
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${!!completedAt && "line-through"}`}>
          {title}
        </p>
        <div
          style={{ backgroundColor: task.project.nameColor }}
          className="flex items-center justify-center h-5 w-5 text-xs   text-white font-bold rounded"
        >
          {project.name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="flex items-center justify-between  ">
        {estimatedTime && (
          <div className="text-muted-foreground text-xs">
            {formatSecondsToReadable(estimatedTime)}
          </div>
        )}
        {expendedTime && (
          <div className="text-muted-foreground text-xs">
            {formatSecondsToReadable(expendedTime)}
          </div>
        )}
      </div>

      {subtasks && subtasks.length > 0 && (
        <Collapsible>
          <div className="border-t mt-2 flex flex-row items-center justify-between pt-2">
            <CollapsibleTrigger asChild>
              <div className="text-muted-foreground text-xs flex flex-row items-center gap-1 hover:cursor-pointer data-[state=open]:font-medium data-[state=open]:text-[14px] transition-smooth ">
                {`${subtasks.filter(subTask => subTask.done).length}/${
                  subtasks.length
                } Subtasks`}{" "}
              </div>
            </CollapsibleTrigger>

            <CollapsibleTrigger asChild>
              <ChevronDown
                size={16}
                className="cursor-pointer text-muted-foreground transition-transform duration-300 data-[state=open]:-rotate-180 hover:text-primary"
              />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
            {subtasks.map((task, idx) => (
              <div key={idx} className="pt-2">
                <div
                  className={`text-muted-foreground text-sm flex flex-row ${
                    task.done && "line-through"
                  }`}
                >
                  {task.title}
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default TaskItem;
