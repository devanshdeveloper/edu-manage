import { tv } from "tailwind-variants";
import { ReactNode } from "react";

const aspectRatio = tv({
  slots: {
    base: "relative w-full",
    content: "absolute inset-0 w-full h-full"
  },
  variants: {
    ratio: {
      "1/1": { base: "pb-[100%]" },
      "4/3": { base: "pb-[75%]" },
      "16/9": { base: "pb-[56.25%]" },
      "2/1": { base: "pb-[50%]" },
      "21/9": { base: "pb-[42.85%]" }
    },
    shadow: {
      sm: { base: "shadow-sm" },
      md: { base: "shadow-md" },
      lg: { base: "shadow-lg" },
      xl: { base: "shadow-xl" }
    }
  },
  defaultVariants: {
    ratio: "1/1"
  }
});



export const AspectRatio = ({
  children,
  className,
  ratio,
  shadow
}) => {
  const { base, content } = aspectRatio({ ratio, shadow, className });

  return (
    <div className={base}>
      <div className={content}>
        {children}
      </div>
    </div>
  );
};