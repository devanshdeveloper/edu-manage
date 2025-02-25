import React from "react";
import { cn } from "../utils/cn";

function FullPageLayout({ children, className }) {
  return (
    <div
      className={cn(
        "w-screen h-screen absolute top-0 left-0 flex flex-col items-center justify-center gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}

export default FullPageLayout;
