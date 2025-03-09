import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

/**
 * @typedef {Object} ParamsStateHookResult
 * @property {any} state - The current state value
 * @property {(newValue: any) => void} setState - Function to update the state and URL parameter
 */

/**
 * Custom hook to manage route params as state, synchronizing URL parameters with component state.
 * When the state changes, it automatically updates the URL parameter, and when the URL parameter
 * changes, it updates the state.
 *
 * @param {string} key - The key for the route parameter (must match the parameter name in the route path)
 * @param {any} defaultValue - The default value to use if the parameter doesn't exist in the URL
 * @returns {[any, Function]} A tuple containing the current state and a setter function
 *
 * @example
 * // Basic usage in a component with a route parameter
 * // Route path: "/user/:userId"
 * function UserProfile() {
 *   const [userId, setUserId] = useParamsState("userId", "default-id");
 *
 *   return (
 *     <div>
 *       <h1>User Profile: {userId}</h1>
 *       <button onClick={() => setUserId("new-id")}>
 *         Switch User
 *       </button>
 *     </div>
 *   );
 * }
 *
 * @example
 * // Using with multiple parameters and type conversion
 * // Route path: "/products/:category/:page"
 * function ProductList() {
 *   const [category, setCategory] = useParamsState("category", "all");
 *   const [page, setPage] = useParamsState("page", "1");
 *
 *   return (
 *     <div>
 *       <select 
 *         value={category}
 *         onChange={(e) => setCategory(e.target.value)}
 *       >
 *         <option value="all">All Products</option>
 *         <option value="electronics">Electronics</option>
 *       </select>
 *       <button 
 *         onClick={() => setPage(String(Number(page) + 1))}
 *       >
 *         Next Page
 *       </button>
 *     </div>
 *   );
 * }
 */
const useParamsState = (key, defaultValue) => {
  const { [key]: paramValue } = useParams(); // Get the parameter from the URL
  const navigate = useNavigate();

  // Initialize state with the param value or fallback to defaultValue
  const [state, setState] = useState(
    paramValue ? decodeURIComponent(paramValue) : defaultValue
  );

  useEffect(() => {
    // Update the URL if state changes
    if (state !== undefined) {
      const urlParams = new URLSearchParams(window.location.search);
      const path = window.location.pathname.replace(
        `:${key}`,
        encodeURIComponent(state)
      );

      // Navigate to the new URL with updated state
      navigate(path, { replace: true });
    }
  }, [state, key, navigate]);

  return [state, setState];
};

export default useParamsState;
