import { useCallback, useEffect, useState } from "react";

/**
 * A custom hook for tracking and responding to window size changes.
 * @typedef {Object} UseWindowSizeProps
 * @property {function(number): void} [onChange] - Callback fired when window width changes significantly (>100px)
 *
 * @typedef {Object} UseWindowSizeReturn
 * @property {number} windowSize - Current window width in pixels
 *
 * @param {UseWindowSizeProps} props - Hook configuration
 * @returns {[number]} Array containing current window width
 *
 * @example
 * function ResponsiveComponent() {
 *   const [windowWidth] = useWindowSize({
 *     onChange: (width) => {
 *       console.log('Window width changed to:', width);
 *       // Adjust layout based on new width
 *     }
 *   });
 *
 *   return (
 *     <div>
 *       <p>Current window width: {windowWidth}px</p>
 *       {windowWidth < 768 ? (
 *         <MobileLayout />
 *       ) : (
 *         <DesktopLayout />
 *       )}
 *     </div>
 *   );
 * }
 */
export default function useWindowSize({ onChange = () => {} }) {
  const [windowSize, setWindowSize] = useState(0);

  const handleResize = useCallback(() => {
    const newWidth = window.innerWidth;
    if (Math.abs(newWidth - windowSize) > 100) {
      setWindowSize(newWidth);
      onChange && onChange(newWidth);
    }
  }, [windowSize, onChange]);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return [windowSize];
}
