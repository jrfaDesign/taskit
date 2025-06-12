import React from "react";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/supabase/server";

import Header from "./_components/Header";
import Footer from "./_components/Footer";
import {
  CreateNewsTaskWrapper,
  CreateNewTaskForm,
} from "./_components/CreateNewTask";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <CreateNewsTaskWrapper>
        <Header />

        <main className="flex-1 flex flex-col p-4 overflow-hidden">
          {children}
        </main>

        <CreateNewTaskForm />
        <Footer />
      </CreateNewsTaskWrapper>
      ;
    </div>
  );
};

export default DashboardLayout;
