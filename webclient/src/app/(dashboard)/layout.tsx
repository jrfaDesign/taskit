import React from "react";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/ThemeToggler";

import { APP_NAME, APP_VERSION, BASE_API } from "@/lib/variables";
import { Button } from "@/components/ui/button";
import { supabaseSignout } from "./actions";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <header className="bg-background/95 border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard -{BASE_API}</h1>
        <Button onClick={supabaseSignout} variant={"outline"}>
          Sign out
        </Button>
      </header>

      <main className="flex-1 flex flex-col p-4 overflow-hidden">
        {children}
      </main>

      <footer className="bg-background/95 border-t px-6 py-4   ">
        <div className="flex flex-row items-center justify-between">
          <p>
            &copy; {new Date().getFullYear()} - {APP_NAME}
          </p>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              Version: {APP_VERSION}
            </p>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
