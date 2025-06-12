"use client";

import React, { useState } from "react";

import Link from "next/link";

import ProjectsCard from "./_components/ProjectsCard";
import HoveredContainer from "./_components/HoveredContainer";
import { useGetProjects } from "@/queries/projects";
import LoadingProjects from "./[listId]/_components/LoadingProjects";

const ListsPage = () => {
  const { data, isLoading, isError } = useGetProjects();
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  if (isLoading) return <LoadingProjects />;
  if (isError || !data) return <p>Error loading tasks.</p>;

  const allProjects = data
    .filter(project => project.id !== "project-all")
    .map(project => ({
      name: project.name,
      color: project.nameColor,
    }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 text-left overflow-y-auto pr-4">
      {data?.map((project, idx) => {
        const isHovered = hoveredProjectId === project.id;

        return (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div
              onMouseEnter={() => setHoveredProjectId(project.id)}
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
