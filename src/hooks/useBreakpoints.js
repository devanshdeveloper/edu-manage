import { useState, useEffect } from "react";

// Define Tailwind-style breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * A custom hook that returns the current breakpoint based on window width
 * @returns {BreakpointSize} Current breakpoint size
 */
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

/* Usage Example:

import { useBreakpoints } from './hooks/useBreakpoints';

function ResponsiveComponent() {
  const breakpoint = useBreakpoints();

  return (
    <div>
      <h1>Current Breakpoint: {breakpoint}</h1>
      {breakpoint === 'xs' && <p>Extra Small Layout</p>}
      {breakpoint === 'sm' && <p>Small Layout</p>}
      {breakpoint === 'md' && <p>Medium Layout</p>}
      {breakpoint === 'lg' && <p>Large Layout</p>}
      {breakpoint === 'xl' && <p>Extra Large Layout</p>}
      {breakpoint === '2xl' && <p>2x Extra Large Layout</p>}
      
      <div className={`
        p-4
        ${breakpoint === 'xs' ? 'text-sm' : ''}
        ${breakpoint === 'sm' ? 'text-base' : ''}
        ${breakpoint === 'md' ? 'text-lg' : ''}
        ${breakpoint === 'lg' ? 'text-xl' : ''}
        ${breakpoint === 'xl' || breakpoint === '2xl' ? 'text-2xl' : ''}
      `}>
        Responsive Text Size
      </div>
    </div>
  );
}
*/
