import { useState } from "react";

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
