import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  useBreakpoints,
  useFilterState,
  usePaginationState,
  useVisibleColumns,
} from "../../../hooks";
import { useQuery } from "@tanstack/react-query";
import useSelectionRows from "../../../hooks/useSelectedRows";

const TableContext = createContext();

const INITIAL_VISIBLE_COLUMNS_BREAKPOINT_MAP = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

export function TableProvider({
  children,
  columns,
  queryOptions,
  initialFilters = {},
}) {
  const currentBreakpoint = useBreakpoints();

  // Pagination State
  const { currentPage, pageSize, totalPages, setCurrentPage, setPageSize } =
    usePaginationState();

  // Selection State

  // Filter State
  const {
    primaryState: appliedFilters,
    apply,
    reset,
    setState: setFilters,
    state: filters,
  } = useFilterState(initialFilters);

  console.log(
    columns.map((e) => e.uid),
    columns
      .map((e) => e.uid)
      .slice(0, INITIAL_VISIBLE_COLUMNS_BREAKPOINT_MAP[currentBreakpoint]),
    INITIAL_VISIBLE_COLUMNS_BREAKPOINT_MAP[currentBreakpoint]
  );

  // Column Visibility State
  const {
    visibleColumns,
    onVisibleColumnsChange,
    isColumnVisible,
    toggleColumn,
    resetVisibleColumns,
  } = useVisibleColumns(
    new Set([
      ...columns
        .map((e) => e.uid)
        .slice(0, INITIAL_VISIBLE_COLUMNS_BREAKPOINT_MAP[currentBreakpoint]),
      "actions",
    ])
  );

  useEffect(() => {
    onVisibleColumnsChange(
      new Set([
        ...columns
          .map((e) => e.uid)
          .slice(0, INITIAL_VISIBLE_COLUMNS_BREAKPOINT_MAP[currentBreakpoint]),
        "actions",
      ])
    );
  }, [currentBreakpoint]);

  // Sort State
  const [sortDescriptor, setSortDescriptor] = useState({
    column: null,
    direction: "ascending",
  });

  console.log({ visibleColumns });

  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    initialData: [],
    ...queryOptions,

    queryKey: [
      ...queryOptions.queryKey,
      currentPage,
      pageSize,
      appliedFilters,
      sortDescriptor,
    ],
    queryFn: () => {
      return queryOptions.queryFn({
        currentPage,
        pageSize,
        filters: appliedFilters,
        sort: sortDescriptor,
      });
    },
  });

  const { selectedKeys, selectionProps } = useSelectionRows({
    items,
  });

  const contextValue = {
    // State
    currentPage,
    pageSize,
    filters,
    visibleColumns,
    sortDescriptor,
    items,
    totalPages,
    isLoading,

    // Setters
    setCurrentPage,
    setPageSize,
    selectedKeys,
    selectionProps,
    setSortDescriptor,

    // Column Visibility
    onVisibleColumnsChange,
    isColumnVisible,
    toggleColumn,
    resetVisibleColumns,

    // Filters
    setFilters,
    apply,
    reset,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
}

export function useTableView() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableView must be used within a TableProvider");
  }
  return context;
}
