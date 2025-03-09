import React from "react";
import { AlertTriangle } from "lucide-react";
import { ConfirmationModal } from "./ConfirmationModal";
import { addToast } from "@heroui/toast";

/**
 * Delete confirmation modal component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {function} props.onClose - Function to close the modal
 * @param {function} props.onConfirm - Function to call when delete is confirmed
 * @param {string} props.title - Modal title
 * @param {string} props.itemName - Name of the item to delete
 * @param {string} props.itemType - Type of item being deleted (e.g., "institution", "student")
 * @param {string} props.size - Modal size
 * @param {Object} [props.mutationOptions] - Additional options for the mutation
 */
export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  itemName = "this item",
  itemType = "item",
  size = "md",
  mutationOptions = {},
}) {
  const message = (
    <div>
      <p>
        Are you sure you want to delete <strong>{itemName}</strong>?
      </p>
      <p className="text-sm text-default-500 mt-1">
        This action cannot be undone. All data associated with this {itemType}{" "}
        will be permanently deleted.
      </p>
    </div>
  );

  // Pass mutation options to ConfirmationModal
  const deleteOptions = {
    // Default options for delete operations
    onSuccess: () => {
      addToast({
        title: "Item deleted",
        description: `${itemName} has been deleted successfully.`,
        variant : "flat",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Error deleting item",
        description: error.message,
        variant : "flat",
        color: "danger",
      });
      console.error(`Error deleting ${itemType}:`, error);
    },
    ...mutationOptions,
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
      size={size}
      icon={<AlertTriangle />}
      mutationOptions={deleteOptions}
    />
  );
}
