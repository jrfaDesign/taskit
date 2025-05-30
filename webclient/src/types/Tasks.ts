export type TaskProps = {
  id: string;
  title: string;

  subtasks?: { title: string; done: boolean }[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  completedAt?: Date | null;

  estimatedTime?: number; // in minutes
  expendedTime?: number; // in minutes

  details?: string;
  priority?: "low" | "medium" | "high";

  position?: number;

  project: {
    id: string;
    name: string;
    nameColor: string;
  };
};

export type GroupedProject = {
  projectId: string;
  projectName: string;
  tasks: TaskProps[];
};
