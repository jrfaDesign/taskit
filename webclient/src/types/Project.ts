import { TaskProps } from "./Tasks";

export type ColumnsId = "backlog" | "this-week" | "today" | "done";

export type ProjectProps = {
  id: string | "project-all";
  name: string;
  nameColor: string;
  tasks: TaskProps[];
  createdAt: Date;
  archived: boolean;
  creatorId: string;
  position: number;
};

export type ProjectIds = string | "project-all";

export type SelectedProjectProps = {
  id: ProjectIds;
  name: string;
  nameColor: string;
  createdAt: Date;
  archived: boolean;
  creatorId: string;

  columns: { [key in ColumnsId]: TaskProps[] };
};
