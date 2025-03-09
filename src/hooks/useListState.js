import { useState, useCallback } from 'react';
import ArrayHelper from '../helpers/ArrayHelper';

/**
 * A custom hook for managing list state with various array manipulation operations.
 * @template T - The type of items in the list
 * @param {T[]} initialState - The initial array of items
 * @returns {[T[], Object]} A tuple containing the current list state and handlers for manipulation
 */
export function useListState(initialState = []) {
  const [state, setState] = useState(initialState);

  const handlers = {
    // Set entire state
    setState: useCallback((newState) => {
      setState(newState);
    }, []),

    // Append items to the end of the list
    append: useCallback((...items) => {
      setState((current) => ArrayHelper.merge(current, items));
    }, []),

    // Prepend items to the start of the list
    prepend: useCallback((...items) => {
      setState((current) => ArrayHelper.merge(items, current));
    }, []),

    // Remove items at given positions
    remove: useCallback((...indices) => {
      setState((current) => {
        const newState = [...current];
        indices.sort((a, b) => b - a).forEach((index) => {
          newState.splice(index, 1);
        });
        return newState;
      });
    }, []),

    // Insert items at a given position
    insert: useCallback((index, ...items) => {
      setState((current) => {
        const newState = [...current];
        newState.splice(index, 0, ...items);
        return newState;
      });
    }, []),

    // Apply a function to each element
    apply: useCallback((fn) => {
      setState((current) => current.map((item, index) => fn(item, index)));
    }, []),

    // Reorder an item from one position to another
    reorder: useCallback(({ from, to }) => {
      setState((current) => {
        const newState = [...current];
        const [item] = newState.splice(from, 1);
        newState.splice(to, 0, item);
        return newState;
      });
    }, []),

    // Swap two items' positions
    swap: useCallback(({ from, to }) => {
      setState((current) => {
        const newState = [...current];
        [newState[from], newState[to]] = [newState[to], newState[from]];
        return newState;
      });
    }, []),

    // Apply a function to elements that match a condition
    applyWhere: useCallback((condition, fn) => {
      setState((current) =>
        current.map((item) => (condition(item) ? fn(item) : item))
      );
    }, []),

    // Set an item at a given position
    setItem: useCallback((index, item) => {
      setState((current) => {
        const newState = [...current];
        newState[index] = item;
        return newState;
      });
    }, []),

    // Set a property of an item at a given position
    setItemProp: useCallback((index, prop, value) => {
      setState((current) => {
        const newState = [...current];
        newState[index] = { ...newState[index], [prop]: value };
        return newState;
      });
    }, []),

    // Filter items based on a condition
    filter: useCallback((fn) => {
      setState((current) => current.filter(fn));
    }, [])
  };

  return [state, handlers];
}

export default useListState;