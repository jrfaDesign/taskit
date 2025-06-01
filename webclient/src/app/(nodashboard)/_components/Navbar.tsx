"use client";

import React from "react";

import Link from "next/link";
import { NAVBAR_HEIGHT } from "@/lib/variables";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { UserProps } from "@/types/User";

const Navbar = ({ user }: { user: UserProps | null }) => {
  const handleSignout = async () => {
    const supabase = await createClient();

    const result = await supabase.auth.signOut();
    console.log(result);
    if (!result) {
      toast.error(result, { position: "top-center" });
    } else {
      toast.success("Login successful!");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 ">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/projects" className="cursor-pointer  " scroll={false}>
            <div className="flex items-center gap-3">Projects</div>
          </Link>
        </div>

        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>

        {user ? (
          <Button variant="outline" onClick={handleSignout}>
            Sign out
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="outline">Log in</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
