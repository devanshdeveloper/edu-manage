import { useDisclosure } from "@heroui/modal";

/**
 * Custom hook for managing modal state using HeroUI's useDisclosure
 * @param {boolean} defaultOpen - Whether the modal should be open by default
 * @returns {Object} Modal props and handlers
 */
export function useModalProps(defaultOpen = false) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({
    defaultOpen,
  });

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
  };
}