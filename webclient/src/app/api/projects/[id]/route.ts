import { NextResponse } from "next/server";

import { ColumnsId, ProjectIds, SelectedProjectProps } from "@/types/Project";
import { TaskProps } from "@/types/Tasks";
import { MOCK_PROJECTS, REAL_PROJECTS } from "../route";

export async function GET(_, props: { params: Promise<{ id: ProjectIds }> }) {
  await new Promise(resolve => setTimeout(resolve, 1500)); // simulate delay

  const projectId = (await props.params).id;

  const PROJECT = MOCK_PROJECTS.find(project => project.id === projectId);

  if (!PROJECT) {
    return new NextResponse(JSON.stringify({ message: "Project not found" }), {
      status: 404,
    });
  }

  const project: SelectedProjectProps = {
    id: PROJECT.id,
    name: PROJECT.name,
    nameColor: PROJECT.nameColor,
    createdAt: PROJECT.createdAt,
    archived: PROJECT.archived,
    creatorId: PROJECT.creatorId,
    columns: generateMockColumns(projectId),
  };

  return NextResponse.json(project);
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uuid(): string {
  return crypto.randomUUID();
}

function generateMockTask(position: number, projectId: string): TaskProps {
  const now = new Date();
  const createdAt = new Date(now.getTime() - getRandomInt(1, 10) * 86400000);
  const updatedAt = new Date(now);
  const estimatedTime = getRandomInt(60, 240);
  const expendedTime = getRandomInt(30, estimatedTime);
  const priority = ["low", "medium", "high"][
    getRandomInt(0, 2)
  ] as TaskProps["priority"];

  const projectData =
    projectId === "project-all"
      ? REAL_PROJECTS[Math.floor(Math.random() * REAL_PROJECTS.length)]
      : REAL_PROJECTS.find(project => project.id === projectId);

  return {
    id: uuid(),
    title: `Task ${position}`,
    subtasks: [
      { title: "Subtask 1", done: true },
      { title: "Subtask 2", done: true },
    ],
    createdAt,
    updatedAt,
    estimatedTime,
    expendedTime,
    details: "Generated dynamically",
    priority,
    position,
    project: {
      id: projectData?.id ?? "project-1",
      name: projectData?.name ?? "Mock Project",
      nameColor: projectData?.nameColor ?? "#3498db",
    },
  };
}

function generateMockColumns(projectId: string): {
  [key in ColumnsId]: TaskProps[];
} {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(now);
  todayEnd.setHours(23, 59, 59, 999);

  const startOfWeek = new Date(todayStart);
  startOfWeek.setDate(todayStart.getDate() - todayStart.getDay() + 1); // Monday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

  const allTasks: TaskProps[] = [];

  for (let i = 1; i <= getRandomInt(20, 35); i++) {
    const task = generateMockTask(i, projectId);
    const roll = getRandomInt(1, 4);

    if (roll === 1) {
      // backlog
      // no dueDate, not completed
    } else if (roll === 2) {
      // today (due today or overdue)
      task.dueDate = new Date(
        todayStart.getTime() - getRandomInt(0, 2) * 86400000
      );
    } else if (roll === 3) {
      // this-week
      const due = new Date(now);
      due.setDate(now.getDate() + getRandomInt(1, 5)); // tomorrow through Sunday
      task.dueDate = due;
    } else {
      // done
      const completed = new Date(now);
      completed.setDate(now.getDate() - getRandomInt(0, 3));
      task.completedAt = completed;
    }

    allTasks.push(task);
  }

  const columns: { [key in ColumnsId]: TaskProps[] } = {
    backlog: [],
    "this-week": [],
    today: [],
    done: [],
  };

  for (const task of allTasks) {
    const { dueDate, completedAt } = task;
    const isCompleted = completedAt && completedAt <= todayEnd;

    if (isCompleted) {
      columns.done.push(task);
    } else if (!dueDate) {
      columns.backlog.push(task);
    } else {
      if (dueDate <= todayEnd) {
        columns.today.push(task);
      } else if (dueDate > todayEnd && dueDate <= endOfWeek) {
        columns["this-week"].push(task);
      } else {
        columns.backlog.push(task); // fallback
      }
    }
  }

  return columns;
}
