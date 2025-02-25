import { useEffect } from "react";

const useHTMLAttributes = (props = {}) => {
  useEffect(() => {
    const html = document.documentElement;

    Object.entries(props).forEach(([key, value]) => {
      if (value) {
        html.setAttribute(key, value);
      } else {
        html.removeAttribute(key);
      }
    });

    return () => {
      Object.keys(props).forEach((key) => {
        html.removeAttribute(key);
      });
    };
  }, [props]);
};

export default useHTMLAttributes;
