import { useState, useEffect, useRef } from "react";

function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = (useRef < HTMLElement) | (null > null);

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
