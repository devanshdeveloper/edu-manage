import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useEffect } from "react";

/**
 * @typedef {Object} PageInfo
 * @property {number} nextPage - The next page number
 * @property {number} count - Total count of items
 */

/**
 * @typedef {Object} Page
 * @property {Array<any>} data - Array of items in the page
 * @property {PageInfo} info - Page information including nextPage and count
 */

/**
 * @typedef {Object} InfiniteQueryExtendedParams
 * @property {string[]} queryKey - The query key for caching
 * @property {function(): Promise<Page>} queryFn - Function to fetch the data
 * @property {Object} [options] - Additional options for the query
 */

/**
 * A custom hook that extends useInfiniteQuery with automatic infinite scrolling capabilities
 * and data flattening.
 * 
 * @param {InfiniteQueryExtendedParams} params - The parameters for the infinite query
 * @returns {Object} An object containing:
 *   - ref: The reference to attach to the last item for infinite scrolling
 *   - flatData: Flattened array of all items across pages
 *   - fetchNextPage: Function to manually fetch the next page
 *   - data: Raw data from useInfiniteQuery
 *   - totalCount: Total number of items available
 *   - Additional properties from useInfiniteQuery results
 */
function useInfiniteQueryExtended({ ...params }) {
  const { fetchNextPage, data, ...queryResults } = useInfiniteQuery({
    ...params,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.info.nextPage;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const flatData = (data && data?.pages?.flatMap((page) => page.data))?.filter(
    (item) => item !== null
  );

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return {
    ...queryResults,
    ref,
    flatData,
    fetchNextPage,
    data,
    totalCount: data?.pages?.[0]?.info?.count,
  };
}

export default useInfiniteQueryExtended;

/* Usage Example:
import { useInfiniteQueryExtended } from './hooks/useInfiniteQueryExtended';

function ProductList() {
  const { 
    flatData: products, 
    ref, 
    isLoading,
    totalCount 
  } = useInfiniteQueryExtended({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/products?page=${pageParam}`);
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {products.map((product, index) => (
        <div key={product.id}>
          {product.name}
          {index === products.length - 1 && <div ref={ref} />}
        </div>
      ))}
      <div>Total Products: {totalCount}</div>
    </div>
  );
}
*/
