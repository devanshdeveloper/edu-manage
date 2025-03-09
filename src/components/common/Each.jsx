import React, { Fragment } from "react";
import { forwardRef } from "react";

/**
 * @typedef {Object} EachProps
 * @property {Array} [items=[]] - Array of items to iterate over
 * @property {function(any, number): React.ReactNode} render - Function to render each item
 * @property {function(any, number): string|number} [keyExtractor] - Function to extract unique key for each item
 * @property {string} [className] - CSS class name for the wrapper element
 * @property {React.ElementType|typeof Fragment} [as=div] - Component or HTML element to use as wrapper
 * @property {function(any): boolean} [filter] - Function to filter items
 * @property {function(any, any): number} [sort] - Function to sort items
 * @property {number} [limit] - Maximum number of items to render
 * @property {number} [offset] - Number of items to skip from the start
 */

/**
 * A flexible component for rendering lists of items with sorting, filtering, and pagination capabilities
 * @type {React.ForwardRefExoticComponent<EachProps>}
 */
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

/**
 * Usage Examples:
 * 
 * 1. Basic list rendering:
 * ```jsx
 * <Each
 *   items={['Apple', 'Banana', 'Orange']}
 *   render={(item) => <li>{item}</li>}
 * />
 * ```
 * 
 * 2. Custom wrapper with filtering and sorting:
 * ```jsx
 * <Each
 *   items={users}
 *   as="ul"
 *   className="user-list"
 *   filter={(user) => user.active}
 *   sort={(a, b) => a.name.localeCompare(b.name)}
 *   render={(user) => (
 *     <li>{user.name} - {user.email}</li>
 *   )}
 * />
 * ```
 * 
 * 3. Pagination example:
 * ```jsx
 * <Each
 *   items={products}
 *   offset={page * pageSize}
 *   limit={pageSize}
 *   render={(product) => (
 *     <ProductCard
 *       name={product.name}
 *       price={product.price}
 *     />
 *   )}
 * />
 * ```
 * 
 * 4. Custom key extractor:
 * ```jsx
 * <Each
 *   items={orders}
 *   keyExtractor={(order) => order.id}
 *   render={(order) => (
 *     <OrderItem
 *       orderNumber={order.number}
 *       total={order.total}
 *     />
 *   )}
 * />
 * ```
 */
