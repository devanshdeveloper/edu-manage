import { useState, useEffect } from "react";
import useEventListener from "./useEventListener"; // Import your useEventListener hook

/**
 * @typedef {Object} IsUserOfflineHookResult
 * @property {boolean} isOffline - Indicates whether the user is currently offline
 */

/**
 * A custom hook that tracks the user's online/offline status.
 * Uses the browser's Navigator.onLine property and online/offline events
 * to provide real-time connection status updates.
 * 
 * @returns {[boolean]} An array containing the offline status
 *   - true if the user is offline
 *   - false if the user is online
 */
export default function useIsUserOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Update the offline state when the user goes online or offline
  const updateOfflineStatus = () => {
    setIsOffline(!navigator.onLine);
  };

  // Use the useEventListener hook to listen to 'online' and 'offline' events
  useEventListener("online", updateOfflineStatus, { element: window });
  useEventListener("offline", updateOfflineStatus, { element: window });

  // Ensure the state is set correctly on mount
  useEffect(() => {
    setIsOffline(!navigator.onLine);
  }, []);

  return [isOffline];
}

/* Usage Example:
import { useIsUserOffline } from './hooks/useIsUserOffline';

function NetworkStatus() {
  const [isOffline] = useIsUserOffline();

  return (
    <div className={`status ${isOffline ? 'offline' : 'online'}`}>
      {isOffline ? 'You are currently offline' : 'You are connected'}
    </div>
  );
}

function App() {
  const [isOffline] = useIsUserOffline();

  useEffect(() => {
    if (isOffline) {
      // Show offline notification
      toast.warning('You are offline. Some features may be unavailable.');
    }
  }, [isOffline]);

  return <NetworkStatus />;
}
*/
