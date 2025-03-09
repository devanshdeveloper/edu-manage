import { useState, useEffect, useRef } from "react";

/**
 * A custom hook for managing the document title with automatic cleanup.
 * @typedef {Object} UseTitleReturn
 * @property {string} title - Current document title
 * @property {function(string): void} setTitle - Function to update the document title
 *
 * @param {string} initialTitle - The initial title to set
 * @returns {[string, function(string): void]} A tuple containing the current title and setter function
 *
 * @example
 * function PageComponent() {
 *   const [title, setTitle] = useTitle('Welcome Page');
 *
 *   useEffect(() => {
 *     // Title will automatically update when user navigates
 *     setTitle(`Welcome ${user.name}`);
 *   }, [user]);
 *
 *   return (
 *     <div>
 *       <h1>{title}</h1>
 *       <button onClick={() => setTitle('New Title')}>Update Title</button>
 *     </div>
 *   );
 * }
 */
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
