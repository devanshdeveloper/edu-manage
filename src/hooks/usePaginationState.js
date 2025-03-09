import { useState, useCallback } from 'react';

/**
 * Custom hook for managing pagination state
 * @param {Object} options - Configuration options
 * @param {number} [options.initialPage=1] - Initial page number
 * @param {number} [options.initialPageSize=10] - Initial page size
 * @param {number} [options.totalItems=0] - Total number of items
 * @returns {Object} Pagination state and control methods
 * @property {number} currentPage - Current page number
 * @property {number} pageSize - Number of items per page
 * @property {number} totalPages - Total number of pages
 * @property {number} totalItems - Total number of items
 * @property {number} startIndex - Index of first item on current page
 * @property {number} endIndex - Index of last item on current page
 * @property {boolean} hasNextPage - Whether there is a next page
 * @property {boolean} hasPreviousPage - Whether there is a previous page
 * @property {(page: number) => void} setCurrentPage - Set current page number
 * @property {(size: number) => void} setPageSize - Set page size
 * @property {() => void} goToNextPage - Go to next page
 * @property {() => void} goToPreviousPage - Go to previous page
 * @property {() => void} goToFirstPage - Go to first page
 * @property {() => void} goToLastPage - Go to last page
 */
const usePaginationState = ({
  initialPage = 1,
  initialPageSize = 10,
  totalItems = 0
} = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Ensure current page stays within valid range
  const validatePageNumber = useCallback((page) => {
    return Math.max(1, Math.min(page, totalPages));
  }, [totalPages]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(validatePageNumber(newPage));
  }, [validatePageNumber]);

  // Handle page size change
  const handlePageSizeChange = useCallback((newPageSize) => {
    const newTotalPages = Math.ceil(totalItems / newPageSize);
    setPageSize(newPageSize);
    setCurrentPage(current => Math.min(current, newTotalPages));
  }, [totalItems]);

  // Calculate pagination metadata
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Navigation methods
  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      handlePageChange(currentPage + 1);
    }
  }, [currentPage, hasNextPage, handlePageChange]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, hasPreviousPage, handlePageChange]);

  const goToFirstPage = useCallback(() => {
    handlePageChange(1);
  }, [handlePageChange]);

  const goToLastPage = useCallback(() => {
    handlePageChange(totalPages);
  }, [handlePageChange, totalPages]);

  return {
    // State
    currentPage,
    pageSize,
    totalPages,
    totalItems,

    // Metadata
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,

    // Methods
    setCurrentPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage
  };
};

export default usePaginationState;

/* Usage Examples:

1. Basic pagination with data list:
```jsx
function DataList() {
  const { data, isLoading } = useQuery(['items'], fetchItems);
  const pagination = usePaginationState({
    totalItems: data?.length || 0,
    initialPageSize: 10
  });

  if (isLoading) return <div>Loading...</div>;

  const currentItems = data.slice(pagination.startIndex, pagination.endIndex);

  return (
    <div>
      <ItemList items={currentItems} />
      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onNextPage={pagination.goToNextPage}
        onPrevPage={pagination.goToPreviousPage}
        onFirstPage={pagination.goToFirstPage}
        onLastPage={pagination.goToLastPage}
      />
    </div>
  );
}
```

2. Pagination with dynamic page size:
```jsx
function TableWithPagination() {
  const { data = [] } = useQuery(['table-data'], fetchTableData);
  const pagination = usePaginationState({
    totalItems: data.length,
    initialPageSize: 20
  });

  return (
    <div>
      <select
        value={pagination.pageSize}
        onChange={(e) => pagination.setPageSize(Number(e.target.value))}
      >
        <option value="10">10 per page</option>
        <option value="20">20 per page</option>
        <option value="50">50 per page</option>
      </select>

      <Table
        data={data.slice(pagination.startIndex, pagination.endIndex)}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />

      <div>
        Showing {pagination.startIndex + 1} to {pagination.endIndex} of {pagination.totalItems}
      </div>
    </div>
  );
}
```

3. Advanced pagination with search and filters:
```jsx
function SearchableList() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading } = useQuery(
    ['filtered-data', filters, searchQuery],
    () => fetchFilteredData(filters, searchQuery)
  );

  const pagination = usePaginationState({
    totalItems: data?.totalCount || 0,
    initialPageSize: 25
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    pagination.goToFirstPage(); // Reset to first page on new search
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    pagination.goToFirstPage(); // Reset to first page on filter change
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <FilterPanel filters={filters} onChange={handleFilterChange} />
      
      <DataGrid
        data={data?.items.slice(pagination.startIndex, pagination.endIndex)}
        isLoading={isLoading}
      />

      <PaginationInfo
        start={pagination.startIndex + 1}
        end={pagination.endIndex}
        total={pagination.totalItems}
        pageSize={pagination.pageSize}
        onPageSizeChange={pagination.setPageSize}
      />
    </div>
  );
}
```
*/