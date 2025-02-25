import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StorageHelper } from "../helpers";

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
