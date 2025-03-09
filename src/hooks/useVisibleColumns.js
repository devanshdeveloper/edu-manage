import { useState } from 'react';

/**
 * A custom hook for managing visible columns in a table component.
 * @typedef {Object} UseVisibleColumnsReturn
 * @property {Set<string>} visibleColumns - Set of currently visible column IDs
 * @property {function(Set<string>): void} onVisibleColumnsChange - Handler for updating visible columns
 * @property {function(string): boolean} isColumnVisible - Function to check if a column is visible
 * @property {function(string): void} toggleColumn - Function to toggle column visibility
 * @property {function(): void} resetVisibleColumns - Function to reset to initial columns
 *
 * @param {string[]} initialColumns - Array of column IDs that should be visible by default
 * @returns {UseVisibleColumnsReturn} Object containing visible columns state and handlers
 *
 * @example
 * function TableComponent() {
 *   const columns = ['id', 'name', 'email', 'status'];
 *   const {
 *     visibleColumns,
 *     onVisibleColumnsChange,
 *     isColumnVisible,
 *     toggleColumn
 *   } = useVisibleColumns(['name', 'email']);
 *
 *   return (
 *     <div>
 *       <div className="column-toggles">
 *         {columns.map(col => (
 *           <button
 *             key={col}
 *             onClick={() => toggleColumn(col)}
 *             className={isColumnVisible(col) ? 'active' : ''}
 *           >
 *             {col}
 *           </button>
 *         ))}
 *       </div>
 *       <table>
 *         <thead>
 *           <tr>
 *             {columns.map(col => 
 *               isColumnVisible(col) && (
 *                 <th key={col}>{col}</th>
 *               )
 *             )}
 *           </tr>
 *         </thead>
 *       </table>
 *     </div>
 *   );
 * }
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