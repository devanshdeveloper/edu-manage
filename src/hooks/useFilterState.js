import useDualState from "./useDualState";

/**
 * A custom hook that provides dual state management for filtering functionality.
 * This hook is a wrapper around useDualState, specifically designed for managing filter states
 * with preview/apply functionality.
 * 
 * @template T
 * @param {T} initialState - The initial state for both primary and secondary filter states
 * @returns {Object} An object containing the following:
 * @returns {T} primaryState - The main filter state that reflects confirmed changes
 * @returns {T} secondaryState - The draft filter state that can be modified without affecting primaryState
 * @returns {() => void} apply - Function to apply secondaryState changes to primaryState
 * @returns {() => void} reset - Function to reset both states to initialState
 * @returns {(newState: Partial<T>) => void} setState - Function to update secondaryState with partial updates
 * @returns {React.Dispatch<React.SetStateAction<T>>} setSecondaryState - Direct setter for secondaryState
 * @returns {T} state - Alias for secondaryState (for convenience)
 */
function useFilterState(...args) {
  return useDualState(...args);
}

export default useFilterState;

/**
 * Example usage:
 * 
 * ```jsx
 * function FilterableList() {
 *   const {
 *     primaryState: appliedFilters,
 *     secondaryState: draftFilters,
 *     setState: updateFilters,
 *     apply: applyFilters,
 *     reset: resetFilters
 *   } = useFilterState({
 *     search: "",
 *     category: "all",
 *     sortBy: "date"
 *   });
 * 
 *   return (
 *     <div>
 *       <div className="filter-controls">
 *         <input
 *           value={draftFilters.search}
 *           onChange={(e) => updateFilters({ search: e.target.value })}
 *           placeholder="Search..."
 *         />
 *         <select
 *           value={draftFilters.category}
 *           onChange={(e) => updateFilters({ category: e.target.value })}
 *         >
 *           <option value="all">All Categories</option>
 *           <option value="active">Active</option>
 *           <option value="archived">Archived</option>
 *         </select>
 *         <button onClick={applyFilters}>Apply Filters</button>
 *         <button onClick={resetFilters}>Reset</button>
 *       </div>
 *       <div className="results">
 *         {/* Use appliedFilters to filter and display your list 
 *         Showing results for: {appliedFilters.search}
 *         in category: {appliedFilters.category}
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
