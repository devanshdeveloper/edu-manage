import isThis from "@devanshdeveloper/is-this";
import { useState, useCallback } from "react";

/**
 * A custom hook for managing toggle state with customizable values.
 * @typedef {Object} UseToggleReturn
 * @property {any} state - Current toggle state value
 * @property {function(any): void} toggle - Function to toggle the state
 *
 * @param {any} [initialValue=false] - Initial state value
 * @param {Array<any>} [toggleValues=[false, true]] - Array of two values to toggle between
 * @returns {[any, function(any): void]} A tuple containing current state and toggle function
 *
 * @example
 * function ToggleComponent() {
 *   const [isOpen, toggle] = useToggle();
 *   
 *   // Basic toggle
 *   const handleBasicToggle = () => toggle();
 *   
 *   // Set specific value
 *   const handleSetTrue = () => toggle(true);
 *   
 *   // Custom values
 *   const [status, toggleStatus] = useToggle('pending', ['pending', 'completed']);
 *   
 *   return (
 *     <div>
 *       <button onClick={handleBasicToggle}>
 *         {isOpen ? 'Close' : 'Open'}
 *       </button>
 *       <button onClick={handleSetTrue}>Set True</button>
 *       <div>Status: {status}</div>
 *     </div>
 *   );
 * }
 */
function useToggle(initialValue = false, toggleValues = [false, true]) {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(
    (value) => {
      if (value === state) return;
      if (isThis.isUndefined(value)) {
        setState((prev) => {
          console.log({prev});
          return prev === toggleValues[0] ? toggleValues[1] : toggleValues[0];
        });
      } else {
        setState(value);
      }
    },
    [toggleValues, useState]
  );

  return [state, toggle];
}

export default useToggle;
