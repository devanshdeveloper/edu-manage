import { useState, useEffect, useCallback } from "react";

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
