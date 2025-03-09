import { tv } from "tailwind-variants";
import { ReactNode } from "react";

const grid = tv({
  base: "grid",
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12"
    },
    gap: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    },
    responsive: {
      sm: {
        1: "sm:grid-cols-1",
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-3",
        4: "sm:grid-cols-4"
      },
      md: {
        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
        6: "md:grid-cols-6"
      },
      lg: {
        1: "lg:grid-cols-1",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
        6: "lg:grid-cols-6",
        12: "lg:grid-cols-12"
      }
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between"
    }
  },
  defaultVariants: {
    cols: 1,
    gap: "md",
    align: "stretch",
    justify: "start"
  }
});


export const Grid = ({
  children,
  className,
  cols,
  gap,
  align,
  justify,
  responsive
}) => {
  return (
    <div className={grid({ cols, gap, align, justify, className })}>
      {children}
    </div>
  );
};