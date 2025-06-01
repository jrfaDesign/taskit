import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navbar from "./_components/Navbar";

const NoDashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  if (user) {
    redirect("/projects");
  }

  return (
    <main>
      <Navbar user={user} />
      <div>{children}</div>
    </main>
  );
};

export default NoDashboardLayout;
