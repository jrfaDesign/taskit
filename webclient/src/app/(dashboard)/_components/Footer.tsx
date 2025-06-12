import React from "react";

import { ThemeToggle } from "@/components/ThemeToggler";
import { APP_NAME, APP_VERSION } from "@/lib/variables";

import { CreateNewsTaskBtn } from "./CreateNewTask";

const Footer = () => {
  return (
    <footer className="bg-background/95 border-t px-6 py-2   ">
      <div className="flex flex-row items-center justify-between">
        <p>
          &copy; {new Date().getFullYear()} - {APP_NAME}
        </p>
        <div>
          <p className="text-md text-muted-foreground">
            Version: {APP_VERSION}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <CreateNewsTaskBtn className="rounded-full" />

          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
