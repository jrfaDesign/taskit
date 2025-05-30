import React from "react";

import Link from "next/link";
import { NAVBAR_HEIGHT } from "@/lib/variables";

const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 ">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/projects" className="cursor-pointer  " scroll={false}>
            <div className="flex items-center gap-3">Prosjects</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
