import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

/**
 * Custom hook to manage route params as state
 * @param {string} key - The key for the route parameter
 * @param {any} defaultValue - The default value if the key doesn't exist in the URL
 * @returns {[any, Function]} - Returns the current state and a setter function to update it
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
