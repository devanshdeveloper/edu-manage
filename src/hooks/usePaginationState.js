import { useState, useCallback } from 'react';

/**
 * Custom hook for managing pagination state
 * @param {Object} options - Configuration options
 * @param {number} options.initialPage - Initial page number (default: 1)
 * @param {number} options.initialPageSize - Initial page size (default: 10)
 * @param {number} options.totalItems - Total number of items
 * @returns {Object} Pagination state and control methods
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