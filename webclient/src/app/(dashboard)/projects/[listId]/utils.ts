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

  // Initialize map with all projects (even if no tasks)
  for (const project of projects) {
    groupedMap.set(project.id, {
      projectId: project.id,
      projectName: project.name,
      projectColor: project.nameColor,
      tasks: [],
    });
  }

  // Assign tasks to their respective projects
  for (const task of tasks) {
    const group = groupedMap.get(task.project.id);
    if (group) {
      group.tasks.push(task);
    } else {
      // Optional: Handle tasks with unknown project ID (if any)
      groupedMap.set(task.project.id, {
        projectId: task.project.id,
        projectName: task.project.name,
        projectColor: task.project.nameColor,
        tasks: [task],
      });
    }
  }

  // Create the "All Projects" group containing all tasks
  const allProjectsGroup: GroupedProject = {
    projectId: "all",
    projectName: "All Projects",
    projectColor: "",
    tasks: [...tasks],
  };

  return [allProjectsGroup, ...Array.from(groupedMap.values())];
}

const projects = [
  {
    id: "project-123",
    name: "Website Redesign",
    nameColor: "#3498db",
  },
  {
    id: "project-456",
    name: "API Launch",
    nameColor: "#e67e22",
  },
  {
    id: "project-789",
    name: "Marketing Campaign",
    nameColor: "#2ecc71",
  },
  {
    id: "project-101",
    name: "Internal Tools",
    nameColor: "#9b59b6",
  },
  {
    id: "project-202", // 👈 this one has no tasks
    name: "New Initiative",
    nameColor: "#f39c12",
  },
];

const today = new Date();
today.setHours(0, 0, 0, 0); // normalize time to start of day

export const mockTasks: TaskProps[] = [
  // Initial 2 tasks as before
  {
    id: "task-1",
    title: "Design homepage wireframe",
    subtasks: [
      { title: "Create sketches", done: true },
      { title: "Get feedback", done: false },
    ],
    createdAt: new Date("2025-05-01T10:00:00Z"),
    updatedAt: new Date("2025-05-05T15:00:00Z"),
    estimatedTime: 180,
    expendedTime: 120,
    details: "Focus on mobile-first design",
    priority: "high",
    dueDate: new Date("2025-05-10T23:59:59Z"),
    completedAt: null,
    position: 1,
    project: projects[0],
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
    estimatedTime: 240,
    expendedTime: 200,
    details: "Include examples for each endpoint",
    priority: "medium",
    dueDate: new Date("2025-05-15T23:59:59Z"),
    completedAt: new Date("2025-05-14T16:00:00Z"),
    position: 2,
    project: projects[1],
  },

  // 33 additional tasks
  ...Array.from({ length: 33 }, (_, i) => {
    const index = i + 3;
    const titles = [
      "Update brand assets",
      "Optimize database indexes",
      "Write blog post",
      "Plan product roadmap",
      "Conduct user testing",
      "Fix mobile nav bugs",
      "Prepare client presentation",
      "Implement analytics",
      "Create social media calendar",
      "Build onboarding flow",
      "Test email templates",
      "Set up CI/CD pipeline",
      "Research competitors",
      "Draft legal disclaimer",
      "Run performance audit",
      "Clean up codebase",
      "Revamp dashboard UI",
      "Add dark mode",
      "Improve accessibility",
      "Generate sitemap",
      "Refactor authentication",
      "Set team goals",
      "Schedule team retro",
      "Write unit tests",
      "Conduct stakeholder review",
      "Update style guide",
      "Fix deployment error",
      "Create user guide",
      "Test notification logic",
      "Setup error tracking",
      "Redesign footer",
      "Refactor state logic",
      "Add SEO tags",
      "Update README",
    ];

    const priorities = ["low", "medium", "high"] as const;
    const title = titles[i % titles.length];

    // CreatedAt random date in April 2025
    const createdAt = new Date(`2025-04-${(i % 28) + 1}T08:00:00Z`);
    const updatedAt = new Date(createdAt.getTime() + 2 * 86400000); // +2 days

    // Due date logic for some tasks:
    // For tasks at indexes divisible by 5: due today, incomplete
    // Divisible by 7: due tomorrow, incomplete
    // Divisible by 11: due day after tomorrow, incomplete
    // Else normal due date +7 days from createdAt
    let dueDate: Date;
    if (index % 5 === 0) {
      dueDate = new Date(today);
    } else if (index % 7 === 0) {
      dueDate = new Date(today.getTime() + 1 * 86400000);
    } else if (index % 11 === 0) {
      dueDate = new Date(today.getTime() + 2 * 86400000);
    } else {
      dueDate = new Date(createdAt.getTime() + 7 * 86400000);
    }

    const estimatedTime = Math.floor(Math.random() * 180 + 60); // 1–4 hrs
    const expendedTime = Math.floor(estimatedTime * Math.random());

    // Project assigned - only first 4 projects (index 0 to 3)
    // Skip project at index 4 to keep it taskless
    const projectIndex = i % 4;
    const project = projects[projectIndex];
    const priority = priorities[i % 3];

    // CompletedAt is null for tasks due today or in next 2 days, else random
    let completedAt: Date | null = null;
    if (![0, 5, 7, 11].some(mod => index % mod === 0)) {
      completedAt = new Date(dueDate.getTime() - 86400000); // completed one day before dueDate
    }

    return {
      id: `task-${index}`,
      title,
      subtasks: [
        { title: "Initial draft", done: true },
        { title: "Final review", done: Math.random() > 0.5 },
      ],
      createdAt,
      updatedAt,
      estimatedTime,
      expendedTime,
      details: "Auto-generated mock task",
      priority,
      dueDate,
      completedAt,
      position: index,
      project,
    };
  }),
];
