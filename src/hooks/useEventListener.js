import { useEffect, useRef } from "react";

/**
 * A custom hook for handling event listeners with proper cleanup and callback reference management.
 * Supports both window events and specific element events with optional immediate execution.
 *
 * @param {string} eventType - The DOM event type to listen for (e.g., 'click', 'scroll', 'resize')
 * @param {(event: Event) => void} callback - The event handler function
 * @param {Object} options - Configuration options
 * @param {HTMLElement | Window | null} [options.element] - The element to attach the listener to (defaults to window)
 * @param {boolean} [options.runOnMount=false] - Whether to run the callback immediately on mount
 * @returns {void}
 */
export default function useEventListener(
  eventType,
  callback,
  { element, runOnMount = false }
) {
  element = element ?? (typeof window === "undefined" ? null : window);

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (runOnMount) {
      callbackRef.current();
    }
  }, []);

  useEffect(() => {
    if (element == null) return;
    const handler = (e) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

/**
 * Example usage:
 * 
 * ```jsx
 * function ScrollToTopButton() {
 *   const [isVisible, setIsVisible] = useState(false);
 * 
 *   // Handle scroll event to show/hide button
 *   useEventListener(
 *     'scroll',
 *     () => {
 *       const scrolled = window.scrollY > 100;
 *       setIsVisible(scrolled);
 *     },
 *     { runOnMount: true }
 *   );
 * 
 *   // Handle click on a specific element
 *   const buttonRef = useRef(null);
 *   useEventListener(
 *     'click',
 *     () => {
 *       window.scrollTo({ top: 0, behavior: 'smooth' });
 *     },
 *     { element: buttonRef.current }
 *   );
 * 
 *   return (
 *     <button
 *       ref={buttonRef}
 *       style={{ display: isVisible ? 'block' : 'none' }}
 *     >
 *       Scroll to Top
 *     </button>
 *   );
 * }
 * ```
 */
