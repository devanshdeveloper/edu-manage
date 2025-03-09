import { useState, useCallback } from 'react';
import useDebounceCallback from './useDebouceCallback';

/**
 * A custom hook that creates a debounced state value.
 * The state will only update after the specified delay has passed since the last change.
 *
 * @param {any} initialValue - The initial state value
 * @param {number} delay - The number of milliseconds to delay updates
 * @returns {[any, Function]} A tuple containing the current state value and a setter function
 */
export function useDebouncedState(initialValue, delay = 300) {
  const [state, setState] = useState(initialValue);

  // Create a debounced version of setState
  const debouncedSetState = useDebounceCallback((value) => {
    setState(value);
  }, delay);

  // Memoize the setter function to maintain consistent reference
  const setDebouncedState = useCallback(
    (value) => {
      const newValue = typeof value === 'function' ? value(state) : value;
      debouncedSetState(newValue);
    },
    [debouncedSetState, state]
  );

  return [state, setDebouncedState];
}

export default useDebouncedState;