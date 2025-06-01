import React from "react";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { GroupedProject } from "@/types/Tasks";
const HoveredContainer = ({
  project,
  isHovered,
}: {
  project: GroupedProject;
  isHovered: boolean;
}) => {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          key="hoverOverlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center
                      bg-white/10 backdrop-blur-md rounded-xl z-[999]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center space-y-4"
          >
            <h6 className="font-medium">{project.projectName}</h6>
            <Button>See more</Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoveredContainer;
