import TaskColumn from "./_components/TaskColumn";
import { ColumnsId, groupTasksByColumn, mockTasks } from "./utils";

interface Params {
  params: {
    listId: string | "all";
  };
}

export default function TasksByIdPage({}: Params) {
  const columns = groupTasksByColumn(mockTasks);

  return (
    <div className="flex flex-1 space-x-4 overflow-y-auto pb-2">
      {Object.entries(columns)
        .sort(
          ([a], [b]) =>
            ORDER.indexOf(a as ColumnsId) - ORDER.indexOf(b as ColumnsId)
        )
        .map(([key, col]) => (
          <TaskColumn
            key={key}
            columnId={key as ColumnsId}
            title={col.title}
            tasks={col.tasks}
          />
        ))}
    </div>
  );
}

const ORDER: ColumnsId[] = ["backlog", "this-week", "overdue", "today", "done"];
