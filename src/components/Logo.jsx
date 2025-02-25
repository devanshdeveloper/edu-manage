import React from "react";
import { School } from "lucide-react";
import { cn } from "../utils/cn";

export function Logo({ size = "md" }) {
  const sizeVariants = {
    logo: {
      sm: "w-10 h-10",
      md: "w-14 h-14",
      lg: "w-20 h-20",
    },
    icon: {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    },
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-primary rounded-full shadow-lg",
        sizeVariants.logo[size] || sizeVariants.logo.md
      )}
    >
      <School
        className={cn(
          "text-white",
          sizeVariants.icon[size] || sizeVariants.icon.md
        )}
      />
    </div>
  );
}
