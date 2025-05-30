"use client";

import React, { useState } from "react";
import { groupTasksByProject, mockTasks } from "./[listId]/utils";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const ListsPage = () => {
  const projects = groupTasksByProject(mockTasks);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 text-left overflow-y-auto pr-4">
      {projects.map(project => {
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
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    key="hoverOverlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center
                      bg-white/10 backdrop-blur-md rounded-xl z-[999]"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center space-y-4"
                    >
                      <h6 className="font-medium">{project.projectName}</h6>
                      <Button>See more</Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>{project.projectName}</div>

              <div className="space-y-2 flex-1">
                {project.tasks.slice(0, 5).map((task, index) => (
                  <div
                    key={task.id}
                    style={{ opacity: 1 - index * 0.15 }}
                    className="transition-opacity bg-muted px-4 py-2 rounded-lg"
                  >
                    {task.title}
                  </div>
                ))}
              </div>

              <div className="text-muted-foreground text-sm">
                {project.tasks.filter(task => !task.completedAt).length} pending
                tasks
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListsPage;
