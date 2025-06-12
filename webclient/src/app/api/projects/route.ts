import { ProjectProps } from "@/types/Project";
import { TaskProps } from "@/types/Tasks";
import { NextResponse } from "next/server";
export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 2500)); // 1.5s delay
  return NextResponse.json(MOCK_PROJECTS);
}

// Step 1: Generate real projects
export const REAL_PROJECTS: ProjectProps[] = Array.from(
  { length: 5 },
  (_, i) => {
    const colors = ["#3498db", "#e67e22", "#2ecc71", "#9b59b6", "#f39c12"];
    const names = [
      "Website Redesign",
      "API Launch",
      "Marketing Campaign",
      "Internal Tools",
      "New Initiative",
    ];

    const creatorId = "user-123";

    const getRandomTasks = (limit: number): TaskProps[] =>
      Array.from({ length: limit }, (_, j) => {
        const maybeDue =
          Math.random() > 0.3
            ? new Date(Date.now() + Math.floor(Math.random() * 10) * 86400000)
            : undefined;

        return {
          id: `task-${i}-${j}`,
          title: `Task ${j + 1} for ${names[i]}`,
          subtasks: [
            { title: "Subtask 1", done: Math.random() > 0.5 },
            { title: "Subtask 2", done: Math.random() > 0.5 },
          ],
          createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 10) * 86400000
          ),
          updatedAt: new Date(),
          estimatedTime: Math.floor(Math.random() * 180 + 60),
          expendedTime: Math.floor(Math.random() * 120),
          details: "Auto-generated task",
          priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as
            | "low"
            | "medium"
            | "high",
          dueDate: maybeDue ?? undefined,
          completedAt: null,
          position: j + 1,
          project: {
            id: `project-${i}`,
            name: names[i],
            nameColor: colors[i],
            tasks: [],
            createdAt: new Date(),
            archived: false,
            creatorId,
          },
        };
      });

    const hasTasks = i !== 4;
    const tasks = hasTasks
      ? getRandomTasks(Math.floor(Math.random() * 5) + 1)
      : [];

    return {
      id: `project-${i}`,
      name: names[i],
      nameColor: colors[i],
      tasks,
      position: i + 1,
      createdAt: new Date(),
      archived: false,
      creatorId,
    };
  }
);

// Step 2: Sort tasks by rules: dueDate first, then createdAt
const allSortedTasks = REAL_PROJECTS.flatMap(project => project.tasks)
  .sort((a, b) => {
    const hasDueA = !!a.dueDate;
    const hasDueB = !!b.dueDate;

    if (hasDueA && hasDueB) {
      return a.dueDate!.getTime() - b.dueDate!.getTime();
    }

    if (hasDueA) return -1;
    if (hasDueB) return 1;

    return a.createdAt.getTime() - b.createdAt.getTime();
  })
  .slice(0, 5);

// Step 3: Build All Projects project
const allProject: ProjectProps = {
  id: "project-all",
  name: "All Projects",
  nameColor: "#95a5a6",
  tasks: allSortedTasks,
  position: 0,
  createdAt: new Date(),
  archived: false,
  creatorId: "system",
};

// Final export
export const MOCK_PROJECTS: ProjectProps[] = [allProject, ...REAL_PROJECTS];
