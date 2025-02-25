import React, { useState, useRef, useEffect, useCallback } from "react";

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
