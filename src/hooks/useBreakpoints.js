import { useState, useEffect } from "react";

// Define Tailwind-style breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const useBreakpoints = () => {
  const getBreakpoint = () => {
    const width = window.innerWidth;

    if (width >= breakpoints["2xl"]) return "2xl";
    if (width >= breakpoints.xl) return "xl";
    if (width >= breakpoints.lg) return "lg";
    if (width >= breakpoints.md) return "md";
    if (width >= breakpoints.sm) return "sm";
    return "xs";
  };
  const [currentBreakpoint, setCurrentBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getBreakpoint());
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return currentBreakpoint;
};

export default useBreakpoints;
