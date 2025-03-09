import { useState, useMemo } from 'react';

/**
 * A custom hook for managing row selection in tables with support for single and multiple selection modes.
 * @typedef {Object} UseSelectionRowsProps
 * @property {Array<any>} items - Array of items to manage selection for
 * @property {'single'|'multiple'} [selectionMode='multiple'] - Selection mode ('single' or 'multiple')
 * @property {function(Set<string|number>|'all'): void} [onSelectionChange] - Callback fired when selection changes
 *
 * @typedef {Object} UseSelectionRowsReturn
 * @property {Set<string|number>|'all'} selectedKeys - Currently selected keys
 * @property {Array<any>} selectedItems - Array of currently selected items
 * @property {function(Set<string|number>|'all'): void} setSelectedKeys - Function to update selected keys
 * @property {function(string|number): boolean} isItemSelected - Function to check if an item is selected
 * @property {function(): void} clearSelection - Function to clear all selections
 * @property {function(): void} selectAll - Function to select all items
 * @property {function(): number} getSelectionCount - Function to get count of selected items
 * @property {'single'|'multiple'} selectionMode - Current selection mode
 * @property {Object} selectionProps - Props object for NextUI Table component
 */
export default function useSelectionRows({ 
  items, 
  selectionMode = 'multiple',
  onSelectionChange 
}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const selectedItems = useMemo(() => {
    if (selectedKeys === 'all') {
      return items;
    }
    
    return items.filter((item) => selectedKeys.has(item.id));
  }, [items, selectedKeys]);

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
    onSelectionChange?.(keys);
  };

  const isItemSelected = (itemId) => {
    if (selectedKeys === 'all') return true;
    return selectedKeys.has(itemId);
  };

  const clearSelection = () => {
    setSelectedKeys(new Set([]));
    onSelectionChange?.(new Set([]));
  };

  const selectAll = () => {
    setSelectedKeys('all');
    onSelectionChange?.('all');
  };

  const getSelectionCount = () => {
    if (selectedKeys === 'all') return items.length;
    return selectedKeys.size;
  };

  return {
    // State
    selectedKeys,
    selectedItems,
    
    // Methods
    setSelectedKeys: handleSelectionChange,
    isItemSelected,
    clearSelection,
    selectAll,
    getSelectionCount,
    
    // Props for NextUI Table
    selectionMode,
    selectionProps: {
      selectedKeys,
      selectionMode,
      onSelectionChange: handleSelectionChange,
    },
  };
}