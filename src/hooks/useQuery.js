import { useState, useEffect, useCallback } from "react";

/**
 * @typedef {Object} QueryOptions
 * @property {Array<any>} queryKey - Array of values that determine when to refetch
 * @property {() => Promise<any>} queryFn - Function that returns a promise with the data
 * @property {boolean} [enabled=true] - Whether the query should automatically run
 * @property {(data: any) => void} [onSuccess] - Callback function called on successful data fetch
 */

/**
 * @typedef {Object} QueryResult
 * @property {any} data - The resulting data from the query
 * @property {boolean} isLoading - Whether the query is currently loading
 * @property {Error|null} error - Any error that occurred during the query
 */

/**
 * Custom hook for data fetching with caching and state management
 * @param {QueryOptions} options - Configuration options for the query
 * @returns {QueryResult} Object containing the query result state
 */
function useQuery({ queryKey, queryFn, enabled = true, onSuccess }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return; // Skip fetching if not enabled
    setIsLoading(true);
    setError(null);

    try {
      const result = await queryFn();
      setData(result);

      if (onSuccess) {
        onSuccess(result); // Call onSuccess callback with data
      }
    } catch (err) {
      setError(err);
      console.error("Error in useQuery:", err);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, onSuccess, ...queryKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
}

export default useQuery;

/* Usage Examples:

1. Basic data fetching:
```jsx
function UserProfile({ userId }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json())
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

2. Conditional fetching with success callback:
```jsx
function Dashboard() {
  const [isReady, setIsReady] = useState(false);
  
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => fetch("/api/dashboard/stats").then(res => res.json()),
    enabled: isReady,
    onSuccess: (data) => {
      console.log("Stats loaded:", data);
      // Perform additional actions with the data
    }
  });

  return (
    <button onClick={() => setIsReady(true)}>
      Load Dashboard Stats
    </button>
  );
}
```
*/
