import { useState, useMemo } from 'react';


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