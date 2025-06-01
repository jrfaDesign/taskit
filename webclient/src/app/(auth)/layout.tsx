import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="p-4 h-screen flex justify-center items-center overflow-y-auto">
      <div className="  dark:border-2 p-8  flex-col   rounded-xl bg-card shadow-md">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
