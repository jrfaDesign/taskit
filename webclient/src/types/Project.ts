import { TaskProps } from "./Tasks";

export type ProjectProps = {
  id: string;
  name: string;
  nameColor: string;
  tasks: TaskProps[];
  createdAt: Date;
  archived: boolean;
  creatorId: string;
};
