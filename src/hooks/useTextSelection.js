import { useState, useEffect } from 'react';

/**
 * A custom hook that tracks text selection in the browser.
 * @typedef {Object} UseTextSelectionReturn
 * @property {string} text - The selected text content
 * @property {DOMRect|null} rect - Bounding rectangle of the selection
 * @property {boolean} isCollapsed - Whether the selection is collapsed (no text selected)
 * @property {number} length - Length of the selected text
 * 
 * @returns {Selection|null} The current selection object or null if no text is selected
 * 
 * @example
 * function TextSelector() {
 *   const selection = useTextSelection();
 * 
 *   useEffect(() => {
 *     if (selection) {
 *       console.log('Selected text:', selection.toString());
 *       console.log('Selection range count:', selection.rangeCount);
 *     }
 *   }, [selection]);
 * 
 *   return (
 *     <div>
 *       <p>Select some text in this paragraph to see the selection details.</p>
 *       {selection && (
 *         <div>
 *           <p>Selected text: {selection.toString()}</p>
 *           <p>Selection type: {selection.type}</p>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 */
export function useTextSelection() {
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const currentSelection = window.getSelection();
      setSelection(currentSelection?.type === 'Range' ? currentSelection : null);
    };

    // Initial selection check
    handleSelectionChange();

    // Add event listeners
    document.addEventListener('selectionchange', handleSelectionChange);

    // Cleanup
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return selection;
}

export default useTextSelection;