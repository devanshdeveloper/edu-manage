import { useEffect } from "react";

/**
 * A custom hook that manages HTML attributes on the document's root element (<html>).
 * Useful for setting global HTML attributes like lang, dir, data-theme, etc.
 * 
 * @param {Object} [props={}] - An object containing HTML attributes as key-value pairs
 * @param {string} [props.lang] - The language attribute for the HTML document
 * @param {string} [props.dir] - The text direction attribute (e.g., 'ltr' or 'rtl')
 * @param {string} [props.className] - CSS classes to apply to the HTML element
 * @param {string} [props.dataset] - Custom data attributes
 */
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

/**
 * Example usage:
 * 
 * ```jsx
 * function App() {
 *   // Set HTML attributes for language and theme
 *   useHTMLAttributes({
 *     lang: 'en',
 *     dir: 'ltr',
 *     'data-theme': 'dark',
 *     class: 'custom-theme'
 *   });
 * 
 *   return (
 *     <div>
 *       <h1>My Application</h1>
 *     </div>
 *   );
 * }
 * ```
 */
