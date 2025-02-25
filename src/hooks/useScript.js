import { useState, useEffect } from "react";

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
