"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { supabaseSignout } from "../actions";

import { useParams, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { useGetProjectByID } from "@/queries/prejectId";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const params = useParams();
  const router = useRouter();

  const listId = params.listId as string | undefined;

  const selectedProject = useGetProjectByID(listId);

  return (
    <header className="bg-background/95 border-b px-6 py-4 flex items-center justify-between">
      <div className="flex flex-row space-x-4 items-center">
        {listId && (
          <Button
            onClick={() => router.back()}
            variant={"link"}
            className="text-[var(--text-secondary)] no-underline "
          >
            <ArrowLeft className=" " size={22} />
            BACK
          </Button>
        )}
        {selectedProject.isLoading ? (
          <Skeleton className="h-[28px] w-[160px]   transition-opacity bg-muted px-4 py-2 rounded-lg " />
        ) : (
          <h5 className="text-xl font-semibold">
            {selectedProject.data?.name
              ? selectedProject.data?.name
              : "Projects"}
          </h5>
        )}
      </div>
      <Button onClick={supabaseSignout} variant={"outline"}>
        Sign out
      </Button>
    </header>
  );
};

export default Header;

/* 


        <button
          onClick={() => router.back()}
          className="mr-4 text-blue-500 hover:underline"
        >
          <ArrowLeft className="inline-block mr-1" /> Back
        </button>
*/
