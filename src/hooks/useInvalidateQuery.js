import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useBroadcast from './useBroadcast';

/**
 * @typedef {Object} InvalidateQueryHookResult
 * @property {(queryKey: string | string[]) => void} invalidateQueries - Function to invalidate queries
 */

/**
 * A custom hook that provides query invalidation functionality with broadcast capability.
 * This hook allows for cross-tab/window query invalidation using a broadcast channel.
 * 
 * @param {string} [namespace='edu-manage'] - The namespace for the broadcast channel
 * @returns {InvalidateQueryHookResult} Object containing the invalidateQueries function
 */
export default function useInvalidateQuery(namespace = 'edu-manage') {
  const queryClient = useQueryClient();
  const { subscribe, publish } = useBroadcast(namespace);

  useEffect(() => {
    const unsubscribe = subscribe('invalidateQuery', (key) => {
      queryClient.invalidateQueries(key);
    });
    return () => unsubscribe();
  }, [subscribe, queryClient]);

  const invalidateQueries = useCallback((queryKey) => {
    publish('invalidateQuery', queryKey);
  }, [queryClient, publish]);

  return { invalidateQueries };
}

/* Usage Example:
import { useInvalidateQuery } from './hooks/useInvalidateQuery';

function UserProfile() {
  const { invalidateQueries } = useInvalidateQuery();
  
  const handleUserUpdate = async () => {
    await updateUser(userData);
    // Invalidate user-related queries across all tabs
    invalidateQueries(['user', 'userProfile']);
  };

  return (
    <button onClick={handleUserUpdate}>
      Update Profile
    </button>
  );
}
*/
