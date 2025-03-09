import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

/**
 * Base modal component using HeroUI Modal
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {function} props.onClose - Function to close the modal
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} props.footer - Modal footer content
 * @param {string} props.size - Modal size (sm, md, lg, xl, full)
 * @param {boolean} props.hideCloseButton - Whether to hide the close button
 * @param {string} props.className - Additional class names for the modal
 */
export function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  hideCloseButton = false,
  className = "",
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      hideCloseButton={hideCloseButton}
      className={className}
      backdrop="blur"
    >
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}