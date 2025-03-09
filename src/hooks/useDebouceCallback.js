import { useCallback, useRef, useEffect } from 'react';

/**
 * A hook that returns a debounced version of the callback function.
 * The debounced function will delay invoking the callback until after
 * the specified wait time has elapsed since the last time it was invoked.
 *
 * @param {Function} callback - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} A debounced version of the callback
 */
export function useDebounceCallback(callback, wait = 300) {
  // Use useRef to store the debounced function to prevent recreation on every render
  const debouncedFnRef = useRef();

  // Create a memoized version of the callback
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    // Create a new debounced function when the callback or wait time changes
    let timeoutId;
    debouncedFnRef.current = (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => memoizedCallback(...args), wait);
    };

    // Cleanup function to clear the timeout when the component unmounts
    // or when the callback/wait time changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [memoizedCallback, wait]);

  // Return the current debounced function
  return debouncedFnRef.current;
}

export default useDebounceCallback;