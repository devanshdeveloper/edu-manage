import { useEffect, useRef } from "react";

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
