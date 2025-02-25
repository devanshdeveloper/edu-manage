import { useEffect } from "react";

const useBodyAttributes = (attributes = {}) => {
  useEffect(() => {
    const body = document.body;

    // Apply all provided attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (value) {
        body.setAttribute(key, value);
      } else {
        body.removeAttribute(key); // Clean up if the value is null or undefined
      }
    });

    // Cleanup function to remove added attributes
    return () => {
      Object.keys(attributes).forEach((key) => {
        body.removeAttribute(key);
      });
    };
  }, [attributes]);
};

export default useBodyAttributes;
