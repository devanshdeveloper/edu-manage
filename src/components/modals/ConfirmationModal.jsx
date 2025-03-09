import React from "react";
import { Button } from "@heroui/button";
import { BaseModal } from "./BaseModal";
import { useMutation } from "@tanstack/react-query";

/**
 * Confirmation modal component with multiple color variants and mutation state handling
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {function} props.onClose - Function to close the modal
 * @param {string} props.title - Modal title
 * @param {string|React.ReactNode} props.message - Confirmation message
 * @param {function} props.onConfirm - Function to call when confirmed
 * @param {string} props.confirmText - Text for confirm button
 * @param {string} props.cancelText - Text for cancel button
 * @param {string} props.variant - Color variant (success, danger, warning, info, primary)
 * @param {string} props.size - Modal size
 * @param {React.ReactNode} props.icon - Optional icon to display
 * @param {Object} [props.mutationOptions] - Additional options for the mutation
 */
export function ConfirmationModal({
  isOpen,
  onClose,
  title = "Confirmation",
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  size = "md",
  icon,
  mutationOptions = {},
}) {
  // Map variant to color
  const colorMap = {
    success: "success",
    danger: "danger",
    warning: "warning",
    info: "secondary",
    primary: "primary",
  };

  // Map variant to background color for icon container
  const bgColorMap = {
    success: "bg-success/10",
    danger: "bg-danger/10",
    warning: "bg-warning/10",
    info: "bg-secondary/10",
    primary: "bg-primary/10",
  };

  // Map variant to text color for icon
  const textColorMap = {
    success: "text-success",
    danger: "text-danger",
    warning: "text-warning",
    info: "text-secondary",
    primary: "text-primary",
  };

  const color = colorMap[variant] || "primary";
  const bgColor = bgColorMap[variant] || "bg-primary/10";
  const textColor = textColorMap[variant] || "text-primary";

  // Use React Query's useMutation hook to handle the confirmation action
  const mutation = useMutation({
    mutationFn: async () => {
      // If onConfirm returns a promise, await it
      if (onConfirm && typeof onConfirm === "function") {
        return await onConfirm();
      }
      return undefined;
    },
    onSettled: () => {
      onClose();
    },
    ...mutationOptions,
  });

  const handleConfirm = () => {
    mutation.mutate();
  };

  // Reset mutation state when modal closes or opens
  React.useEffect(() => {
    if (!isOpen && (mutation.isSuccess || mutation.isError)) {
      mutation.reset();
    }
  }, [isOpen, mutation]);

  const footer = (
    <>
      <Button variant="flat" onPress={onClose} disabled={mutation.isPending}>
        {cancelText}
      </Button>
      <Button
        color={color}
        onPress={handleConfirm}
        isLoading={mutation.isPending}
        disabled={mutation.isPending}
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size={size}
    >
      <div className="flex flex-col items-center gap-4 py-4">
        {icon && (
          <div className={`rounded-full ${bgColor} p-4`}>
            {React.cloneElement(icon, { className: `w-8 h-8 ${textColor}` })}
          </div>
        )}
        <div className="text-center">
          <div className="text-lg">{message}</div>

          {/* Show error message if mutation failed */}
          {mutation.isError && (
            <div className="mt-2 text-sm text-danger">
              {mutation.error?.message ||
                "An error occurred. Please try again."}
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
