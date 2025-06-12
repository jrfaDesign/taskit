"use client";

import { useGetProjectByID } from "@/queries/prejectId";
import TaskColumn from "./_components/TaskColumn";

import { ColumnsId, ProjectIds } from "@/types/Project";
import { useParams } from "next/navigation";

type ProjectParams = {
  listId: ProjectIds;
};
export default function TasksByIdPage() {
  const { listId } = useParams() as ProjectParams;
  const {
    data: selectedProject,
    isLoading,
    isError,
  } = useGetProjectByID(listId);

  if (isLoading) return <p> loading tasks.</p>;
  if (isError || !selectedProject) return <p>Error loading tasks.</p>;

  return (
    <div className="flex flex-1 space-x-4 overflow-y-auto pb-2 lg:px-20">
      {Object.entries(selectedProject.columns).map(([key, col]) => {
        return (
          <TaskColumn
            key={key}
            columnId={key as ColumnsId}
            title={COLUMN_ID_TO_NAME[key as ColumnsId]}
            tasks={col}
          />
        );
      })}
    </div>
  );
}

const COLUMN_ID_TO_NAME: { [key in ColumnsId]: string } = {
  backlog: "Backlog",
  "this-week": "This Week",
  today: "Today",
  done: "Done",
};
