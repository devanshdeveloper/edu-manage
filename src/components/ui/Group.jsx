import { tv } from "tailwind-variants";
import { ReactNode } from "react";

const group = tv({
  base: "flex items-center",
  variants: {
    position: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      apart: "justify-between"
    },
    spacing: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap"
    },
    grow: {
      true: "flex-1"
    },
    noWrap: {
      true: "whitespace-nowrap"
    }
  },
  defaultVariants: {
    position: "left",
    spacing: "sm",
    wrap: false
  }
});

export const Group = ({
  children,
  className,
  position,
  spacing,
  wrap,
  grow,
  noWrap
}) => {
  return (
    <div className={group({ position, spacing, wrap, grow, noWrap, className })}>
      {children}
    </div>
  );
};