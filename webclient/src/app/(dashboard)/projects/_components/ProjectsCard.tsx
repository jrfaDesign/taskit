import { GroupedProject } from "@/types/Tasks";
import React from "react";

type Props = {
  project: GroupedProject;
  allProjects: ProjectNameIconProps[] | null;
};

type ProjectNameIconProps = {
  name: string;
  color: string;
};

const ProjectsCard = ({ project, allProjects }: Props) => {
  return (
    <>
      {" "}
      <div className="flex  gap-2 items-center ">
        {allProjects ? (
          <AllProjectsIcon allProjects={allProjects} />
        ) : (
          <ProjectNameIcon
            color={project.projectColor}
            name={project.projectName}
          />
        )}

        <div className="font-medium">{project.projectName}</div>
      </div>
      <div className="space-y-2 flex-1">
        {project.tasks.slice(0, 5).map((task, index) => (
          <div
            key={task.id}
            style={{ opacity: 1 - index * 0.15 }}
            className="transition-opacity bg-muted px-4 py-2 rounded-lg "
          >
            {task.title}
          </div>
        ))}
      </div>
      <div className="text-muted-foreground text-sm">
        {project.tasks.filter(task => !task.completedAt).length} pending tasks
      </div>
    </>
  );
};

export default ProjectsCard;

const ProjectNameIcon = ({ name, color }: ProjectNameIconProps) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex items-center justify-center h-5 w-5 text-xs   text-white font-bold rounded"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

const AllProjectsIcon = ({
  allProjects,
}: {
  allProjects: ProjectNameIconProps[];
}) => {
  const maxVisible = 4;
  const visibleProjects = allProjects.slice(0, maxVisible);
  const remainingCount = allProjects.length - maxVisible;

  return (
    <div className="flex -space-x-1">
      {visibleProjects.map(proj => (
        <ProjectNameIcon key={proj.name} color={proj.color} name={proj.name} />
      ))}

      {remainingCount > 0 && (
        <div className="flex items-center justify-center h-5 w-5 text-xs bg-muted text-muted-foreground font-bold rounded border border-white">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
