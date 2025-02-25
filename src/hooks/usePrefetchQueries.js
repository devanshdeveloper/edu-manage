import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const usePrefetchQueries = (...Queries) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = (useState < string) | (null > null);

  const prefetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: fetchFunction,
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { prefetch, isLoading, error };
};

export default usePrefetchQueries;
