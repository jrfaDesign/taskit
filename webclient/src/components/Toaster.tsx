import React from "react";

import { Toaster } from "sonner";

const StyledToaster = () => {
  return (
    <Toaster
      swipeDirections={["bottom", "top", "left", "right"]}
      toastOptions={{
        classNames: {
          error:
            "!bg-red-100 !border !border-red-400  z-99 !svg-red-500 sonner-toast-error select-none",
          success:
            "!bg-green-100 !border !border-green-400 z-99 !svg-red-500 sonner-toast-success select-none",
          warning:
            "!bg-amber-100 !border !border-amber-400  z-99 !svg-red-500 sonner-toast-warning select-none",
          info: "!bg-sky-100 !border !border-sky-400  z-99 !svg-red-500 sonner-toast-info select-none",
          //  toast: "!bg-sky-100 !border !border-sky-400  z-99",
        },
      }}
    />
  );
};

export default StyledToaster;
