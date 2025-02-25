import { useState, useEffect, useRef } from "react";

const useTitle = (initialTitle) => {
  const documentDefined = typeof document !== "undefined";
  const originalTitle = useRef(documentDefined ? document.title : "");
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle.current;
    };
  }, [title]);

  return [title, setTitle];
};

export default useTitle;
