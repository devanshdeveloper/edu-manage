import { useState, useEffect, useRef } from "react";

/**
 * @typedef {Object} InViewOptions
 * @property {number} [threshold=0] - A number between 0 and 1 indicating the percentage that should be visible
 * @property {string|HTMLElement} [root=null] - The element that is used as the viewport
 * @property {string} [rootMargin='0px'] - Margin around the root element
 */

/**
 * @typedef {Object} InViewHookResult
 * @property {React.RefObject<HTMLElement>} ref - The ref object to attach to the target element
 * @property {boolean} isInView - Whether the element is currently in view
 */

/**
 * A custom hook that detects when an element enters or leaves the viewport using IntersectionObserver.
 * 
 * @param {InViewOptions} [options={}] - Configuration options for the IntersectionObserver
 * @returns {InViewHookResult} Object containing the ref to attach and the current visibility state
 */
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return { ref: elementRef, isInView };
}

export default useInView;

/* Usage Example:
import { useInView } from './hooks/useInView';

function LazyLoadedImage() {
  const { ref, isInView } = useInView({
    threshold: 0.1,
    rootMargin: '50px'
  });

  return (
    <div ref={ref}>
      {isInView ? (
        <img src="https://example.com/image.jpg" alt="Lazy loaded content" />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
*/
