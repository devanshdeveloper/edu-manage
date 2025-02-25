import { useState, useEffect } from "react";
import useEventListener from "./useEventListener"; // Import your useEventListener hook

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
