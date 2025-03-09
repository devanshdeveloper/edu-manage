import { tv } from "tailwind-variants";
import { ReactNode } from "react";

const appShell = tv({
  base: "min-h-screen w-full",
  variants: {
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    background: {
      default: "bg-white dark:bg-gray-900",
      transparent: "bg-transparent",
      gray: "bg-gray-100 dark:bg-gray-800",
    },
    display: {
      flex: "flex",
      block: "block",
      grid: "grid",
    }
  },
  defaultVariants: {
    padding: "md",
    background: "default",
    display: "block"
  }
});



export const AppShell = ({
  children,
  className,
  padding,
  background,
  display
}) => {
  return (
    <div className={appShell({ padding, background, display, className })}>
      {children}
    </div>
  );
};