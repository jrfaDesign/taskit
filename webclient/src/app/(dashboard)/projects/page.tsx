"use client";

import React, { useState } from "react";
import { groupTasksByProject, mockTasks } from "./[listId]/utils";

import Link from "next/link";

import ProjectsCard from "./_components/ProjectsCard";
import HoveredContainer from "./_components/HoveredContainer";

const ListsPage = () => {
  const projects = groupTasksByProject(mockTasks);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const allProjects = projects.map(proj => ({
    name: proj.projectName,
    color: proj.projectColor,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 text-left overflow-y-auto pr-4">
      {projects.map((project, idx) => {
        const isHovered = hoveredProjectId === project.projectId;

        return (
          <Link href={`/projects/${project.projectId}`} key={project.projectId}>
            <div
              onMouseEnter={() => setHoveredProjectId(project.projectId)}
              onMouseLeave={() => setHoveredProjectId(null)}
              className="relative flex flex-1 border-2 gap-4 p-4 flex-col min-w-[100%]
              rounded-xl bg-card shadow-md select-none transition-smooth hover:border-primary h-full
              hover:cursor-pointer"
            >
              <HoveredContainer isHovered={isHovered} project={project} />

              <ProjectsCard
                project={project}
                allProjects={idx === 0 ? allProjects : null}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListsPage;
