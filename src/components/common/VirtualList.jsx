import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * @typedef {Object} VirtualListProps
 * @property {Array<any>} items - Array of items to be rendered in the virtual list
 * @property {number} itemHeight - Fixed height of each item in pixels
 * @property {number} height - Total height of the virtual list container
 * @property {(item: any, index: number) => React.ReactNode} renderItem - Function to render each item
 * @property {number} [overscan=5] - Number of items to render beyond visible area
 */

/**
 * A virtualized list component that efficiently renders large lists by only rendering
 * items that are currently visible in the viewport plus a small overscan area.
 * 
 * @param {VirtualListProps} props - Component props
 * @returns {React.ReactNode} Rendered virtual list
 */
const VirtualList = ({
  items,
  itemHeight,
  height,
  renderItem,
  overscan = 5, // Extra items to render for smoother scrolling
}) => {
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleEndIndex, setVisibleEndIndex] = useState(0);

  const containerRef = useRef(null);

  const calculateVisibleIndexes = useCallback(() => {
    const scrollTop = containerRef.current?.scrollTop || 0;
    const totalVisibleItems = Math.ceil(height / itemHeight);
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan
    );
    const endIndex = Math.min(
      items.length,
      startIndex + totalVisibleItems + overscan * 2
    );

    setVisibleStartIndex(startIndex);
    setVisibleEndIndex(endIndex);
  }, [height, itemHeight, overscan, items.length]);

  useEffect(() => {
    calculateVisibleIndexes(); // Initial calculation
  }, [calculateVisibleIndexes]);

  const handleScroll = () => {
    calculateVisibleIndexes();
  };

  const visibleItems = items.slice(visibleStartIndex, visibleEndIndex);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${height}px`,
        overflowY: "auto",
        border: "1px solid #ccc",
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`,
          position: "relative",
        }}
      >
        {visibleItems.map((item, index) => {
          const actualIndex = visibleStartIndex + index;
          return (
            <div
              key={actualIndex}
              style={{
                position: "absolute",
                top: `${actualIndex * itemHeight}px`,
                height: `${itemHeight}px`,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualList;

/**
 * Usage Example:
 * 
 * ```jsx
 * import VirtualList from './components/common/VirtualList';
 * 
 * function LargeList() {
 *   // Example with 10000 items
 *   const items = Array.from({ length: 10000 }, (_, i) => ({
 *     id: i,
 *     title: `Item ${i + 1}`
 *   }));
 * 
 *   const renderItem = (item, index) => (
 *     <div className="p-4 border-b">
 *       <h3>{item.title}</h3>
 *       <p>Item Index: {index}</p>
 *     </div>
 *   );
 * 
 *   return (
 *     <VirtualList
 *       items={items}
 *       itemHeight={80} // Fixed height for each item
 *       height={400} // Container height
 *       renderItem={renderItem}
 *       overscan={3} // Number of items to render beyond visible area
 *     />
 *   );
 * }
 * ```
 */
