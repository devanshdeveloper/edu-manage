import { useState } from 'react';

/**
 * A custom hook for managing visible columns in a table component
 * @param {string[]} initialColumns - Array of column IDs that should be visible by default
 * @returns {Object} Object containing visible columns state and handlers
 */
export default function useVisibleColumns(initialColumns) {
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(initialColumns)
  );

  /**
   * Handler for changing visible columns selection
   * @param {Set<string>} selection - New selection of visible columns
   */
  const onVisibleColumnsChange = (selection) => {
    console.log(selection);


    setVisibleColumns(selection);
  };

  /**
   * Check if a specific column is currently visible
   * @param {string} columnId - ID of the column to check
   * @returns {boolean} Whether the column is visible
   */
  const isColumnVisible = (columnId) => {
    return visibleColumns.has(columnId);
  };

  /**
   * Toggle visibility of a specific column
   * @param {string} columnId - ID of the column to toggle
   */
  const toggleColumn = (columnId) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(columnId)) {
      newVisibleColumns.delete(columnId);
    } else {
      newVisibleColumns.add(columnId);
    }
    setVisibleColumns(newVisibleColumns);
  };

  /**
   * Reset visible columns to initial state
   */
  const resetVisibleColumns = () => {
    setVisibleColumns(new Set(initialColumns));
  };

  return {
    visibleColumns,
    onVisibleColumnsChange,
    isColumnVisible,
    toggleColumn,
    resetVisibleColumns,
  };
}