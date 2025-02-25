import { useState, useCallback } from "react";

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
