import { useQuery } from "@tanstack/react-query";
import ControlledSelect from "./ControlledSelect";

function ControlledAsyncSelect({ queryOptions, ...selectProps }) {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    ...queryOptions,
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });

  const options = data || [];

  return (
    <ControlledSelect
      {...selectProps}
      scrollRef={scrollRef}
      options={options}
      isLoading={isLoading}
      errorMessage={error?.message}
    />
  );
}

export default ControlledAsyncSelect;
