"use client";

import React from "react";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/ThemeToggler";
import { APP_NAME, APP_VERSION } from "@/lib/utils";

import { BASE_API } from "@/lib/variables";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <header className="bg-background/95 border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Dashboard -{BASE_API}</h1>
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
