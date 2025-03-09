import { useState, useEffect } from "react";

/**
 * @typedef {Object} ScriptOptions
 * @property {string} src - URL of the script to load
 * @property {string} id - Unique identifier for the script element
 * @property {boolean} [async=true] - Whether to load the script asynchronously
 * @property {boolean} [defer=false] - Whether to defer loading the script
 * @property {string} [crossOrigin=null] - CORS setting for the script
 * @property {() => void} [onLoadCallback] - Callback function when script loads successfully
 * @property {() => void} [onErrorCallback] - Callback function when script fails to load
 */

/**
 * @typedef {Object} ScriptResult
 * @property {boolean} isLoaded - Whether the script has loaded successfully
 * @property {boolean} isError - Whether there was an error loading the script
 */

/**
 * Custom hook for dynamically loading external scripts with state management
 * @param {ScriptOptions} options - Configuration options for the script
 * @returns {ScriptResult} Object containing script loading state
 */
const useScript = ({
  src,
  id,
  async = true,
  defer = false,
  crossOrigin = null,
  onLoadCallback = () => {},
  onErrorCallback = () => {},
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Prevent duplicate script injection
    const existingScript = document.getElementById(id);
    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = async;
    script.defer = defer;

    if (crossOrigin) {
      script.crossOrigin = crossOrigin;
    }

    const handleLoad = () => {
      setIsLoaded(true);
      onLoadCallback();
    };

    const handleError = () => {
      setIsError(true);
      onErrorCallback();
    };

    script.onload = handleLoad;
    script.onerror = handleError;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src, id, async, defer, crossOrigin]);

  return { isLoaded, isError };
};

export default useScript;

/* Usage Examples:

1. Loading a third-party analytics script:
```jsx
function Analytics() {
  const { isLoaded, isError } = useScript({
    src: "https://analytics.example.com/tracker.js",
    id: "analytics-script",
    onLoadCallback: () => console.log("Analytics script loaded"),
    onErrorCallback: () => console.error("Failed to load analytics")
  });

  useEffect(() => {
    if (isLoaded && !isError) {
      // Initialize analytics
      window.analytics.init();
    }
  }, [isLoaded, isError]);

  return null;
}
```

2. Loading a payment gateway script with CORS:
```jsx
function PaymentForm() {
  const { isLoaded, isError } = useScript({
    src: "https://js.stripe.com/v3/",
    id: "stripe-js",
    crossOrigin: "anonymous",
    async: true
  });

  if (!isLoaded) return <div>Loading payment system...</div>;
  if (isError) return <div>Error loading payment system</div>;

  return (
    <form onSubmit={handlePayment}>
    </form>
  );
}
```
*/
