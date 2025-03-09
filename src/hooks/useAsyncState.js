/**
 * @typedef {Object} AsyncStateOptions
 * @property {*} initialValue - The initial state value
 * @property {() => Promise<*>} asyncFn - Async function to fetch/compute the state
 * @property {boolean} [enabled=true] - Whether to run the async function on mount
 */

/**
 * @typedef {Object} AsyncStateReturn
 * @property {*} state - Current state value
 * @property {(asyncFn: () => Promise<*>) => Promise<void>} setAsyncState - Function to update state asynchronously
 * @property {boolean} isLoading - Whether the async operation is in progress
 * @property {Error|null} error - Error object if the async operation failed
 */

import isThis from "@devanshdeveloper/is-this";
import { useEffect, useState } from "react";
import useEffectOnce from "./useEffectOnce";

/**
 * A custom hook for managing async state with loading and error handling
 * @param {AsyncStateOptions} options - Configuration options
 * @returns {AsyncStateReturn} Object containing state and control functions
 */
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

/* Usage Example:

import { useAsyncState } from './hooks/useAsyncState';

function UserProfile() {
  const { 
    state: user, 
    isLoading, 
    error, 
    setAsyncState 
  } = useAsyncState({
    initialValue: null,
    asyncFn: async () => {
      const response = await fetch('https://api.example.com/user/1');
      return response.json();
    },
    enabled: true
  });

  const handleRefresh = () => {
    setAsyncState(async () => {
      const response = await fetch('https://api.example.com/user/1');
      return response.json();
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}
*/
