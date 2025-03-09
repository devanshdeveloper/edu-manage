import { tv } from "tailwind-variants";
import { ReactNode } from "react";

const simpleGrid = tv({
  base: "grid",
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6"
    },
    spacing: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    },
    verticalSpacing: {
      xs: "gap-y-1",
      sm: "gap-y-2",
      md: "gap-y-4",
      lg: "gap-y-6",
      xl: "gap-y-8"
    },
    responsive: {
      sm: {
        1: "sm:grid-cols-1",
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-3"
      },
      md: {
        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4"
      },
      lg: {
        1: "lg:grid-cols-1",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
        5: "lg:grid-cols-5",
        6: "lg:grid-cols-6"
      }
    }
  },
  defaultVariants: {
    cols: 1,
    spacing: "md"
  }
});



export const SimpleGrid = ({
  children,
  className,
  cols,
  spacing,
  verticalSpacing,
  responsive
}) => {
  return (
    <div className={simpleGrid({ cols, spacing, verticalSpacing, className })}>
      {children}
    </div>
  );
};