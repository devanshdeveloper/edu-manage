import { tv } from "tailwind-variants";
import { ReactNode } from "react";

const flex = tv({
  base: "flex",
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      rowReverse: "flex-row-reverse",
      columnReverse: "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      wrapReverse: "flex-wrap-reverse",
    },
    gap: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    inline: {
      true: "inline-flex",
    },
  },
  defaultVariants: {
    direction: "row",
    align: "stretch",
    justify: "start",
    wrap: "nowrap",
  },
});

export const Flex = ({
  children,
  className,
  direction,
  align,
  justify,
  wrap,
  gap,
  inline,
}) => {
  return (
    <div
      className={flex({
        direction,
        align,
        justify,
        wrap,
        gap,
        inline,
        className,
      })}
    >
      {children}
    </div>
  );
};
