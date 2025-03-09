import { useEffect, useRef } from "react";

/**
 * A custom hook that ensures an effect callback is only executed once when a component mounts.
 * Provides proper cleanup handling for the effect.
 *
 * @param {() => (void | (() => void))} effect - The effect callback to run once.
 *   Can optionally return a cleanup function.
 * @returns {void}
 *
 * @example
 * // The effect will only run once when the component mounts
 * useEffectOnce(() => {
 *   const connection = createWebSocketConnection();
 *   return () => connection.close(); // Cleanup when component unmounts
 * });
 */
function useEffectOnce(effect) {
  const cleanupRef = useRef();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      cleanupRef.current = effect();
    }

    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, []);
}

export default useEffectOnce;

/**
 * Example usage:
 * 
 * ```jsx
 * function AnalyticsTracker() {
 *   useEffectOnce(() => {
 *     // Initialize analytics
 *     const analytics = initializeAnalytics();
 *     trackPageView();
 * 
 *     // Cleanup function
 *     return () => {
 *       analytics.disconnect();
 *     };
 *   });
 * 
 *   return null; // This component doesn't render anything
 * }
 * 
 * function DataFetcher() {
 *   const [data, setData] = useState(null);
 * 
 *   useEffectOnce(() => {
 *     let isMounted = true;
 * 
 *     async function fetchData() {
 *       const result = await fetch('/api/data');
 *       const json = await result.json();
 *       
 *       if (isMounted) {
 *         setData(json);
 *       }
 *     }
 * 
 *     fetchData();
 * 
 *     return () => {
 *       isMounted = false;
 *     };
 *   });
 * 
 *   return data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>;
 * }
 * ```
 */
