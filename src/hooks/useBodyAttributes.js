import { useEffect } from "react";

/**
 * @typedef {Object.<string, string|null>} BodyAttributes
 */

/**
 * A custom hook for managing HTML body element attributes
 * @param {BodyAttributes} attributes - Object containing attribute key-value pairs to apply to the body element
 * @returns {void}
 * @example
 * // Example attributes object:
 * // { 'data-theme': 'dark', 'class': 'no-scroll', 'data-layout': 'fixed' }
 */
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

/* Usage Example:

import { useBodyAttributes } from './hooks/useBodyAttributes';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // Apply theme and layout attributes to body
  useBodyAttributes({
    'data-theme': theme,
    'data-layout': 'fixed',
    'class': theme === 'dark' ? 'dark-mode' : 'light-mode'
  });

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {children}
    </div>
  );
}
*/
