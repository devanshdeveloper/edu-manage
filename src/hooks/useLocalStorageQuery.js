import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StorageHelper } from "../helpers";

/**
 * Custom hook for managing cached data with React Query and localStorage
 * @template T
 * @param {Object} queryOptions - The query configuration options
 * @param {Array<string|number>} queryOptions.queryKey - Unique key for the query
 * @param {() => Promise<T>} queryOptions.queryFn - Function that returns a promise resolving to the data
 * @param {string} [queryOptions.storageKey] - Custom key for localStorage (defaults to stringified queryKey)
 * @param {boolean} [queryOptions.refetchOnMount=false] - Whether to refetch data when component mounts
 * @param {(data: T) => boolean} [queryOptions.validate] - Optional validation function for the fetched data
 * @returns {Object} Query result object with additional set method
 * @property {T} data - The query data
 * @property {boolean} isLoading - Whether the query is loading
 * @property {boolean} isError - Whether the query encountered an error
 * @property {Error|null} error - Error object if query failed
 * @property {(newData: T) => T} set - Function to manually update the cached data
 */
const useLocalStorageQuery = (queryOptions) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    ...queryOptions,
    queryFn: async () => {
      const cachedData = StorageHelper.getLocal(
        queryOptions.storageKey || JSON.stringify(queryOptions.queryKey)
      );

      if (cachedData && !queryOptions.refetchOnMount) {
        return cachedData;
      }

      const data = await queryOptions.queryFn();

      if (queryOptions.validate && !queryOptions.validate(data)) {
        return cachedData;
      }

      StorageHelper.setLocal(
        queryOptions.storageKey || JSON.stringify(queryOptions.queryKey),
        data
      );
      return data;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    initialData: () => {
      const cachedData = StorageHelper.getLocal(
        queryOptions.storageKey || JSON.stringify(queryOptions.queryKey)
      );
      return cachedData;
    },
  });

  return {
    ...query,
    set: (data) => {
      StorageHelper.setLocal(
        queryOptions.storageKey || JSON.stringify(queryOptions.queryKey),
        data
      );
      queryClient.setQueryData(queryOptions.queryKey, data);
      return data;
    },
  };
};

export default useLocalStorageQuery;

/* Usage Examples:

1. Basic data fetching with caching:
```jsx
function UserProfile() {
  const { data: user, isLoading } = useLocalStorageQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserData(userId),
    storageKey: `user-${userId}`
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

2. With validation and manual updates:
```jsx
function ProductList() {
  const { data: products, isLoading, set } = useLocalStorageQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    validate: (data) => Array.isArray(data) && data.length > 0
  });

  const addProduct = (newProduct) => {
    set([...products, newProduct]);
  };

  return (
    <div>
      {products?.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
      <button onClick={() => addProduct({ id: Date.now(), name: 'New Product' })}>
        Add Product
      </button>
    </div>
  );
}
```

3. With refetch on mount:
```jsx
function RealTimeData() {
  const { data, isLoading, isError } = useLocalStorageQuery({
    queryKey: ['realtime-data'],
    queryFn: fetchLatestData,
    refetchOnMount: true
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h2>Latest Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
*/
