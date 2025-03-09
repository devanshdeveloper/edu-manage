import { tv } from "tailwind-variants";

const space = tv({
  base: "block",
  variants: {
    h: {
      xs: "h-1",
      sm: "h-2",
      md: "h-4",
      lg: "h-6",
      xl: "h-8"
    },
    w: {
      xs: "w-1",
      sm: "w-2",
      md: "w-4",
      lg: "w-6",
      xl: "w-8"
    },
    inline: {
      true: "inline-block"
    }
  },
  defaultVariants: {
    h: "md"
  }
});


export const Space = ({
  className,
  h,
  w,
  inline
}) => {
  return <div className={space({ h, w, inline, className })} />;
};