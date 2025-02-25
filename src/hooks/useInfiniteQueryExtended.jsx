import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useEffect } from "react";

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
