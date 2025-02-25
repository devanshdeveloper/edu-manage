import React, { Fragment } from "react";
import { forwardRef } from "react";

const Each = forwardRef(
  (
    {
      items = [],
      render,
      keyExtractor,
      className,
      as,
      filter,
      sort,
      limit,
      offset,
    },
    ref
  ) => {
    items = Array.isArray(items) ? items : [];

    let processedItems = [...items];
    if (filter) processedItems = processedItems.filter(filter);
    if (sort) processedItems = processedItems.sort(sort);
    if (typeof offset === "number")
      processedItems = processedItems.slice(offset);
    if (typeof limit === "number")
      processedItems = processedItems.slice(0, limit);

    const Wrapper = as || "div";

    return (
      <Wrapper ref={ref} {...(Wrapper === Fragment ? {} : { className })}>
        {processedItems.map((item, index) => (
          <Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
            {render(item, index)}
          </Fragment>
        ))}
      </Wrapper>
    );
  }
);

export default Each;
