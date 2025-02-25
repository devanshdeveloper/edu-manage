import { useState, useMemo } from 'react';
import { Selection } from '@nextui-org/react';

interface UseSelectionRowsProps<T> {
  items: T[];
  selectionMode?: 'single' | 'multiple';
  onSelectionChange?: (keys: Selection) => void;
}

export function useSelectionRows<T>({ 
  items, 
  selectionMode = 'multiple',
  onSelectionChange 
}: UseSelectionRowsProps<T>) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const selectedItems = useMemo(() => {
    if (selectedKeys === 'all') {
      return items;
    }
    
    return items.filter((item: any) => selectedKeys.has(item.id));
  }, [items, selectedKeys]);

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
    onSelectionChange?.(keys);
  };

  const isItemSelected = (itemId: string | number) => {
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