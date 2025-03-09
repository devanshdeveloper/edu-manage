import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

/**
 * @typedef {Object} QueryConfig
 * @property {Array<any>} queryKey - The query key for cache management
 * @property {() => Promise<any>} queryFn - The function to fetch the data
 */

/**
 * @typedef {Object} PrefetchResult
 * @property {() => Promise<void>} prefetch - Function to trigger the prefetch
 * @property {boolean} isLoading - Whether the prefetch is in progress
 * @property {string|null} error - Error message if prefetch failed
 */

/**
 * Custom hook for prefetching multiple queries and caching their results
 * @param {...QueryConfig} queries - Query configurations to prefetch
 * @returns {PrefetchResult} Object containing prefetch function and status
 *
 * @example
 * // Basic usage with a single query
 * function ProductList() {
 *   const { prefetch, isLoading } = usePrefetchQueries({
 *     queryKey: ['product', 1],
 *     queryFn: () => fetchProduct(1)
 *   });
 *
 *   return (
 *     <button 
 *       onMouseEnter={() => prefetch()}
 *       disabled={isLoading}
 *     >
 *       Load Product
 *     </button>
 *   );
 * }
 *
 * @example
 * // Using with multiple queries
 * function CategoryPage() {
 *   const { prefetch, isLoading, error } = usePrefetchQueries(
 *     {
 *       queryKey: ['category', 'electronics'],
 *       queryFn: () => fetchCategory('electronics')
 *     },
 *     {
 *       queryKey: ['products', 'electronics'],
 *       queryFn: () => fetchProductsByCategory('electronics')
 *     }
 *   );
 *
 *   useEffect(() => {
 *     prefetch(); // Prefetch both queries when component mounts
 *   }, []);
 *
 *   if (error) return <div>Error: {error}</div>;
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return <div>Category Content</div>;
 * }
 */
const usePrefetchQueries = (...queries) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const prefetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Promise.all(
        queries.map(({ queryKey, queryFn }) =>
          queryClient.prefetchQuery({
            queryKey,
            queryFn,
          })
        )
      );
    } catch (error) {
      setError(error.message || 'Failed to prefetch queries');
    } finally {
      setIsLoading(false);
    }
  };

  return { prefetch, isLoading, error };
};

export default usePrefetchQueries;
