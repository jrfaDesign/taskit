"use client";
import React, { ReactNode, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Plus, Loader2 } from "lucide-react";

const CreateNewTaskForm = () => {
  const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);

  const handleCreateNewTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsCreatingNewTask(true);
    setTimeout(() => {
      setIsCreatingNewTask(false);
    }, 2000);
  };
  return (
    <AlertDialogContent className="space-y-4">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isCreatingNewTask} className="w-[50%]">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            disabled={isCreatingNewTask}
            onClick={e => handleCreateNewTask(e)}
            className="w-[50%]"
          >
            {isCreatingNewTask ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const CreateNewsTaskWrapper = ({ children }: { children: ReactNode }) => {
  return <AlertDialog>{children} </AlertDialog>;
};

const CreateNewsTaskBtn = ({
  variant,
  withIcon,
  className,
}: CreateNewsTaskBtnProps) => {
  return (
    <AlertDialogTrigger asChild>
      <Button className={className} variant={variant}>
        {" "}
        {withIcon && <Plus />}Add new task
      </Button>
    </AlertDialogTrigger>
  );
};

export { CreateNewTaskForm, CreateNewsTaskBtn, CreateNewsTaskWrapper };

type CreateNewsTaskBtnProps = {
  className?: React.ComponentProps<"div">["className"];
  withIcon?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};
