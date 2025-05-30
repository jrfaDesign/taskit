// utils/groupTasksByColumn.ts
import { GroupedProject, TaskProps } from "@/types/Tasks";
import { isToday, isThisWeek, isBefore, startOfToday } from "date-fns";

export type ColumnsId = "backlog" | "this-week" | "today" | "done" | "overdue";

export function groupTasksByColumn(
  tasks: TaskProps[]
): Record<ColumnsId, { title: string; tasks: TaskProps[] }> {
  const columns: Record<ColumnsId, { title: string; tasks: TaskProps[] }> = {
    backlog: { title: "Backlog", tasks: [] },
    "this-week": { title: "This Week", tasks: [] },
    today: { title: "Today", tasks: [] },
    done: { title: "Done", tasks: [] },
    overdue: { title: "Overdue", tasks: [] },
  };

  const today = startOfToday();

  for (const task of tasks) {
    const due = task.dueDate;

    if (task.completedAt) {
      columns.done.tasks.push(task);
    } else if (!due) {
      columns.backlog.tasks.push(task);
    } else if (isBefore(due, today)) {
      columns.overdue.tasks.push(task);
    } else if (isToday(due)) {
      columns.today.tasks.push(task);
    } else if (isThisWeek(due, { weekStartsOn: 1 })) {
      columns["this-week"].tasks.push(task);
    } else {
      columns.backlog.tasks.push(task); // Optional fallback
    }
  }

  return columns;
}

// Not used
export function formatSecondsToMinutes(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function formatSecondsToReadable(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h${minutes}`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}min`;
  }
}

export function groupTasksByProject(tasks: TaskProps[]): GroupedProject[] {
  const groupedMap = new Map<string, GroupedProject>();

  for (const task of tasks) {
    if (!groupedMap.has(task.project.id)) {
      groupedMap.set(task.project.id, {
        projectId: task.project.id,
        projectName: task.project.name,
        tasks: [],
      });
    }
    groupedMap.get(task.project.id)!.tasks.push(task);
  }

  // Create the "All Projects" group containing all tasks
  const allProjectsGroup: GroupedProject = {
    projectId: "all",
    projectName: "All Projects",
    tasks: [...tasks],
  };

  // Convert map values to array and add "All Projects" at index 0
  return [allProjectsGroup, ...Array.from(groupedMap.values())];
}

export const mockTasks: TaskProps[] = [
  {
    id: "task-1",
    title: "Design homepage wireframe",
    subtasks: [
      { title: "Create sketches", done: true },
      { title: "Get feedback", done: false },
    ],
    createdAt: new Date("2025-05-01T10:00:00Z"),
    updatedAt: new Date("2025-05-05T15:00:00Z"),
    estimatedTime: 180, // 3 hours
    expendedTime: 120, // 2 hours
    details: "Focus on mobile-first design",
    priority: "high",
    dueDate: new Date("2025-05-10T23:59:59Z"),
    completedAt: null,
    position: 1,
    project: {
      id: "project-123",
      name: "Website Redesign",
      nameColor: "#3498db",
    },
  },
  {
    id: "task-2",
    title: "Write API documentation",
    subtasks: [
      { title: "Draft intro", done: true },
      { title: "List endpoints", done: true },
      { title: "Review and finalize", done: false },
    ],
    createdAt: new Date("2025-04-20T09:30:00Z"),
    updatedAt: new Date("2025-04-25T11:00:00Z"),
    estimatedTime: 240, // 4 hours
    expendedTime: 200,
    details: "Include examples for each endpoint",
    priority: "medium",
    dueDate: new Date("2025-05-15T23:59:59Z"),
    completedAt: new Date("2025-05-14T16:00:00Z"),
    position: 2,
    project: {
      id: "project-456",
      name: "API Launch",
      nameColor: "#e67e22",
    },
  },
];
