import { tv } from "tailwind-variants";
import { ReactNode } from "react";

const center = tv({
  base: "flex items-center justify-center",
  variants: {
    inline: {
      true: "inline-flex"
    },
    fullWidth: {
      true: "w-full"
    },
    fullHeight: {
      true: "h-full"
    },
    gap: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    },
    direction: {
      row: "flex-row",
      column: "flex-col"
    }
  },
  defaultVariants: {
    direction: "row"
  }
});



export const Center = ({
  children,
  className,
  inline,
  fullWidth,
  fullHeight,
  gap,
  direction
}) => {
  return (
    <div className={center({ inline, fullWidth, fullHeight, gap, direction, className })}>
      {children}
    </div>
  );
};