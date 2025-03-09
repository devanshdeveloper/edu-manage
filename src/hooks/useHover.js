import { useState, useRef, useEffect } from "react";

/**
 * A custom hook that detects when a DOM element is being hovered over.
 * 
 * @returns {[React.RefObject<HTMLElement>, boolean]} A tuple containing:
 * @returns {React.RefObject<HTMLElement>} ref - The ref object to attach to the target element
 * @returns {boolean} isHovered - Whether the element is currently being hovered over
 */
const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const element = ref.current;
    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return [ref, isHovered];
};

export default useHover;

/**
 * Example usage:
 * 
 * ```jsx
 * function HoverableComponent() {
 *   const [hoverRef, isHovered] = useHover();
 * 
 *   return (
 *     <div
 *       ref={hoverRef}
 *       style={{
 *         padding: '20px',
 *         backgroundColor: isHovered ? '#f0f0f0' : 'white',
 *         transition: 'background-color 0.3s'
 *       }}
 *     >
 *       {isHovered ? 'Hovering!' : 'Hover over me!'}
 *     </div>
 *   );
 * }
 * ```
 */
