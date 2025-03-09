import { tv } from "tailwind-variants";
import { ReactNode } from "react";

const container = tv({
  base: "mx-auto px-4",
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      fluid: "max-w-none"
    },
    padding: {
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
      xl: "px-12",
      none: "px-0"
    },
    centered: {
      true: "flex items-center justify-center"
    }
  },
  defaultVariants: {
    size: "lg",
    padding: "md"
  }
});


export const Container = ({
  children,
  className,
  size,
  padding,
  centered
}) => {
  return (
    <div className={container({ size, padding, centered, className })}>
      {children}
    </div>
  );
};