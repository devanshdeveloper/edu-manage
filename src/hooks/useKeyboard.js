import { useCallback } from 'react';
import useEventListener from './useEventListener';

// Helper to parse the key combination string
/**
 * @typedef {Object} KeyCombination
 * @property {boolean} altKey - Whether the Alt key is required
 * @property {boolean} ctrlKey - Whether the Ctrl key is required
 * @property {boolean} metaKey - Whether the Meta/Command key is required
 * @property {boolean} shiftKey - Whether the Shift key is required
 * @property {string} key - The main key in the combination
 */

/**
 * @typedef {Array} ShortcutDefinition
 * @property {string} 0 - The key combination string (e.g., 'ctrl+shift+a')
 * @property {function(KeyboardEvent): void} 1 - The handler function to execute
 */

/**
 * Parses a key combination string into an object describing the required keys.
 * 
 * @param {string} combination - The key combination string (e.g., 'ctrl+shift+a')
 * @returns {KeyCombination} An object describing the key combination
 */
const parseKeyCombination = (combination) => {
  const keys = combination.toLowerCase().split('+');
  return {
    altKey: keys.includes('alt'),
    ctrlKey: keys.includes('ctrl'),
    metaKey: keys.includes('mod') || keys.includes('meta'),
    shiftKey: keys.includes('shift'),
    key: keys[keys.length - 1]
  };
};

/**
 * A custom hook for handling keyboard shortcuts in React components.
 * Supports modifier keys (Ctrl, Alt, Shift, Meta/Command) and combinations.
 * 
 * @param {ShortcutDefinition[]} shortcuts - Array of shortcut definitions
 * @returns {void}
 */
export default function useKeyboard(shortcuts) {
  const handleKeyDown = useCallback(
    (event) => {
      // Normalize the event key
      const eventKey = event.key.toLowerCase();

      // Check each shortcut
      shortcuts.forEach(([combination, handler]) => {
        const { altKey, ctrlKey, metaKey, shiftKey, key } = parseKeyCombination(combination);

        // Check if the key combination matches
        const isMatch =
          eventKey === key &&
          event.altKey === altKey &&
          event.ctrlKey === ctrlKey &&
          (event.metaKey === metaKey || event.ctrlKey === metaKey) && // 'mod' matches either Ctrl or Meta
          event.shiftKey === shiftKey;

        if (isMatch) {
          event.preventDefault();
          handler(event);
        }
      });
    },
    [shortcuts]
  );

  useEventListener('keydown', handleKeyDown, {});
}

/* Usage Example:
import { useKeyboard } from './hooks/useKeyboard';

function TextEditor() {
  const [text, setText] = useState('');
  
  useKeyboard([
    // Save shortcut (Ctrl/Cmd + S)
    ['mod+s', (e) => {
      e.preventDefault();
      saveDocument(text);
    }],
    // Undo shortcut (Ctrl/Cmd + Z)
    ['mod+z', (e) => {
      e.preventDefault();
      undoLastChange();
    }],
    // Custom shortcut (Alt + Shift + P)
    ['alt+shift+p', () => {
      togglePreviewMode();
    }]
  ]);

  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something..."
    />
  );
}
*/