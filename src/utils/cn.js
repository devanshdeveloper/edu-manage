import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args) {
  return twMerge(clsx(args));
}

export function getClassesFromVariant(variants, variant, className, key) {
  if (key) {
    return [variants?.[variant]?.[key], className?.[key]];
  }

  return [variants?.[variant], className];
}
