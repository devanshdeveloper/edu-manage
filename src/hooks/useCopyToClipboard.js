/**
 * @typedef {Object} CopyToClipboardReturn
 * @property {boolean} isCopied - Whether the text was successfully copied
 * @property {(text: string) => Promise<boolean>} copy - Function to copy text to clipboard
 */

import { useState } from "react";

/**
 * A custom hook for copying text to the clipboard with status feedback
 * @returns {CopyToClipboardReturn} Object containing copy function and status
 */
function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text) => {
    if (!navigator.clipboard) {
      console.error("Clipboard API is not available");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      return true;
    } catch (error) {
      console.error("Failed to copy text: ", error);
      return false;
    }
  };

  return { isCopied, copy };
}

export default useCopyToClipboard;

/* Usage Example:

import { useCopyToClipboard } from './hooks/useCopyToClipboard';

function ShareButton({ textToCopy }) {
  const { isCopied, copy } = useCopyToClipboard();

  const handleCopy = async () => {
    const success = await copy(textToCopy);
    if (success) {
      console.log('Text copied successfully!');
    } else {
      console.error('Failed to copy text');
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={isCopied ? 'bg-green-500' : 'bg-blue-500'}
    >
      {isCopied ? 'Copied!' : 'Copy to Clipboard'}
    </button>
  );
}
*/
