import { useState, useCallback } from "react";

/**
 * A custom hook that manages two synchronized states - primary and secondary.
 * Useful for implementing features like form editing with preview/apply functionality.
 *
 * @template T
 * @param {T} initialState - The initial value for both primary and secondary states
 * @returns {Object} An object containing the following:
 * @returns {T} primaryState - The main state that reflects confirmed changes
 * @returns {T} secondaryState - The draft state that can be modified without affecting primaryState
 * @returns {() => void} apply - Function to apply secondaryState changes to primaryState
 * @returns {() => void} reset - Function to reset both states to initialState
 * @returns {(newState: Partial<T>) => void} setState - Function to update secondaryState with partial updates
 * @returns {React.Dispatch<React.SetStateAction<T>>} setSecondaryState - Direct setter for secondaryState
 * @returns {T} state - Alias for secondaryState (for convenience)
 */
const useDualState = (initialState) => {
  const [primaryState, setPrimaryState] = useState(initialState);
  const [secondaryState, setSecondaryState] = useState(initialState);

  const apply = useCallback(() => {
    setPrimaryState(secondaryState);
  }, [setPrimaryState, secondaryState]);

  const reset = useCallback(() => {
    setPrimaryState(initialState);
    setSecondaryState(initialState);
  }, [initialState, setPrimaryState, setSecondaryState]);

  const setState = useCallback(
    (newState) => {
      setSecondaryState(() => ({ ...secondaryState, ...newState }));
    },
    [secondaryState]
  );

  return {
    primaryState,
    secondaryState,
    apply,
    reset,
    setSecondaryState,
    setState,
    state: secondaryState,
  };
};

export default useDualState;

/**
 * Example usage:
 * 
 * ```jsx
 * function FormWithPreview() {
 *   const {
 *     primaryState: savedData,
 *     secondaryState: formData,
 *     setState: updateForm,
 *     apply: saveChanges,
 *     reset: resetForm
 *   } = useDualState({
 *     title: "",
 *     description: ""
 *   });
 * 
 *   return (
 *     <div>
 *       <div className="form">
 *         <input
 *           value={formData.title}
 *           onChange={(e) => updateForm({ title: e.target.value })}
 *         />
 *         <textarea
 *           value={formData.description}
 *           onChange={(e) => updateForm({ description: e.target.value })}
 *         />
 *         <button onClick={saveChanges}>Save</button>
 *         <button onClick={resetForm}>Reset</button>
 *       </div>
 *       <div className="preview">
 *         <h3>Preview: {formData.title}</h3>
 *         <p>{formData.description}</p>
 *       </div>
 *       <div className="saved">
 *         <h3>Saved: {savedData.title}</h3>
 *         <p>{savedData.description}</p>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
