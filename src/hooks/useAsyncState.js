import isThis from "@devanshdeveloper/is-this";
import { useEffect, useState } from "react";
import useEffectOnce from "./useEffectOnce";

export default function useAsyncState({ initialValue, asyncFn, enabled }) {
  const [state, setState] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setAsyncState = async (asyncFn) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      setState(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffectOnce(() => {
    if (!isThis.isFunction(asyncFn)) return;
    setAsyncState(asyncFn);
  });

  return { state, setAsyncState, isLoading, error };
}
