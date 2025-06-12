import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingProjects = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 text-left overflow-y-auto pr-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative flex flex-1 border-2 gap-4 p-4 flex-col min-w-[100%]
              rounded-xl bg-card shadow-md select-none transition-smooth "
        >
          <Skeleton className="h-[32px] w-[130px]   transition-opacity bg-muted px-4 py-2 rounded-lg " />
          <Skeleton className="h-[32px] w-[100%]  transition-opacity bg-muted px-4 py-2 rounded-lg " />
          <Skeleton className="h-[32px] w-[100%]  transition-opacity bg-muted px-4 py-2 rounded-lg " />
          <Skeleton className="h-[32px] w-[100%]  transition-opacity bg-muted px-4 py-2 rounded-lg " />
          <Skeleton className="h-[32px] w-[100%]  transition-opacity bg-muted px-4 py-2 rounded-lg " />
          <Skeleton className="h-[32px] w-[100%]  transition-opacity bg-muted px-4 py-2 rounded-lg " />
          <Skeleton className="h-[22px] w-[30%]  transition-opacity bg-muted px-4 py-2 rounded-lg " />
        </div>
      ))}
    </div>
  );
};

export default LoadingProjects;
