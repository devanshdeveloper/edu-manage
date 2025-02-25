import { useEffect, useRef } from "react";

export default function useEventListener(
  eventType,
  callback,
  { element, runOnMount = false }
) {
  element = element ?? (typeof window === "undefined" ? null : window);

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (runOnMount) {
      callbackRef.current();
    }
  }, []);

  useEffect(() => {
    if (element == null) return;
    const handler = (e) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
