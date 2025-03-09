import React, { useState } from "react";
import { Button } from "@heroui/button";
import { BaseModal } from "./BaseModal";
import { ConfirmationModal } from "./ConfirmationModal";
import { DeleteModal } from "./DeleteModal";
import { useModalProps } from "./hooks/useModalProps";
import { Info, CheckCircle, AlertTriangle, HelpCircle, AlertCircle } from "lucide-react";

/**
 * Example component demonstrating all modal types
 * Shows how to use BaseModal, ConfirmationModal, and DeleteModal with proper state management
 * and mutation handling for async operations
 */
export function ModalExample() {
  // Using the useModalProps hook for each modal type
  const baseModalProps = useModalProps();
  const confirmModalProps = useModalProps();
  const deleteModalProps = useModalProps();
  
  // State for confirmation result
  const [confirmationResult, setConfirmationResult] = useState("");
  const [deleteResult, setDeleteResult] = useState("");
  
  // State for variant selection
  const [confirmVariant, setConfirmVariant] = useState("primary");
  
  // State for simulating async operations
  const [simulateError, setSimulateError] = useState(false);
  const [simulateDelay, setSimulateDelay] = useState(false);
  
  // Example content for the base modal
  const baseModalFooter = (
    <>
      <Button variant="flat" onPress={baseModalProps.onClose}>
        Close
      </Button>
      <Button color="primary" onPress={baseModalProps.onClose}>
        Save Changes
      </Button>
    </>
  );
  
  // Handlers for confirmation modal - simulating async operation
  const handleConfirm = async () => {
    // Simulate an async operation
    if (simulateDelay) {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Simulate an error if the error toggle is on
    if (simulateError) {
      throw new Error("Simulated error in confirmation action");
    }
    
    setConfirmationResult("Action confirmed at " + new Date().toLocaleTimeString());
    return "Success"; // Return value will be available in mutation.data
  };
  
  // Handlers for delete modal - simulating async operation
  const handleDelete = async () => {
    // Simulate an async operation
    if (simulateDelay) {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Simulate an error if the error toggle is on
    if (simulateError) {
      throw new Error("Simulated error in delete operation");
    }
    
    setDeleteResult("Item deleted at " + new Date().toLocaleTimeString());
    return "Success"; // Return value will be available in mutation.data
  };
  
  // Get icon based on variant
  const getVariantIcon = (variant) => {
    switch (variant) {
      case "success": return <CheckCircle />;
      case "danger": return <AlertCircle />;
      case "warning": return <AlertTriangle />;
      case "info": return <Info />;
      default: return <HelpCircle />;
    }
  };
  
  // Custom mutation options for confirmation modal
  const confirmMutationOptions = {
    onSuccess: (data) => {
      console.log("Confirmation successful:", data);
    },
    onError: (error) => {
      console.error("Confirmation failed:", error);
    }
  };
  
  // Custom mutation options for delete modal
  const deleteMutationOptions = {
    onSuccess: (data) => {
      console.log("Delete successful:", data);
    }
    // onError is already handled by DeleteModal's default options
  };
  
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Modal Examples</h1>
      
      {/* Simulation Controls */}
      <section className="space-y-4 p-4 border border-default-200 rounded-lg bg-default-50">
        <h2 className="text-xl font-semibold">Simulation Controls</h2>
        <p className="text-default-500">
          Use these controls to simulate different states of modal operations.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={simulateDelay}
              onChange={() => setSimulateDelay(!simulateDelay)}
              className="h-4 w-4"
            />
            <span>Simulate Delay (1.5s)</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={() => setSimulateError(!simulateError)}
              className="h-4 w-4"
            />
            <span>Simulate Error</span>
          </label>
        </div>
      </section>
      
      {/* Base Modal Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Base Modal</h2>
        <p className="text-default-500">
          The BaseModal is a foundation component that provides core modal functionality.
        </p>
        <Button color="primary" onPress={baseModalProps.onOpen}>
          Open Base Modal
        </Button>
        
        <BaseModal
          isOpen={baseModalProps.isOpen}
          onClose={baseModalProps.onClose}
          title="Base Modal Example"
          footer={baseModalFooter}
        >
          <div className="space-y-4">
            <p>
              This is a basic modal example using the BaseModal component. It provides the foundation
              for all other modal types in the system.
            </p>
            <p>
              The BaseModal handles the modal container, header, body, and footer sections, allowing
              you to customize each part as needed.
            </p>
          </div>
        </BaseModal>
      </section>
      
      {/* Confirmation Modal Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Confirmation Modal</h2>
        <p className="text-default-500">
          The ConfirmationModal is used to confirm user actions with different color variants.
          It handles async operations with loading states and error handling.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <select 
            className="px-3 py-1 border rounded-md"
            value={confirmVariant}
            onChange={(e) => setConfirmVariant(e.target.value)}
          >
            <option value="primary">Primary</option>
            <option value="success">Success</option>
            <option value="danger">Danger</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          
          <Button color={confirmVariant} onPress={confirmModalProps.onOpen}>
            Open {confirmVariant.charAt(0).toUpperCase() + confirmVariant.slice(1)} Confirmation
          </Button>
        </div>
        
        {confirmationResult && (
          <div className="mt-2 p-2 bg-success/10 text-success rounded-md">
            {confirmationResult}
          </div>
        )}
        
        <ConfirmationModal
          isOpen={confirmModalProps.isOpen}
          onClose={confirmModalProps.onClose}
          title={`${confirmVariant.charAt(0).toUpperCase() + confirmVariant.slice(1)} Confirmation`}
          message={
            <div>
              <p>Are you sure you want to perform this action?</p>
              {simulateDelay && (
                <p className="text-sm text-default-500 mt-1">
                  This operation will take a moment to complete.
                </p>
              )}
              {simulateError && (
                <p className="text-sm text-warning-500 mt-1">
                  (Error simulation is enabled - this will trigger an error)
                </p>
              )}
            </div>
          }
          onConfirm={handleConfirm}
          confirmText="Yes, Proceed"
          cancelText="Cancel"
          variant={confirmVariant}
          icon={getVariantIcon(confirmVariant)}
          mutationOptions={confirmMutationOptions}
        />
      </section>
      
      {/* Delete Modal Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Delete Modal</h2>
        <p className="text-default-500">
          The DeleteModal is a specialized confirmation modal for delete operations.
          It includes built-in error handling and loading states for async operations.
        </p>
        
        <Button color="danger" onPress={deleteModalProps.onOpen}>
          Delete Item
        </Button>
        
        {deleteResult && (
          <div className="mt-2 p-2 bg-danger/10 text-danger rounded-md">
            {deleteResult}
          </div>
        )}
        
        <DeleteModal
          isOpen={deleteModalProps.isOpen}
          onClose={deleteModalProps.onClose}
          onConfirm={handleDelete}
          title="Delete Item"
          itemName="Example Item"
          itemType="example"
          // mutationOptions={deleteMutationOptions}
        />
      </section>
      
      {/* Documentation Section */}
      <section className="space-y-4 p-4 border border-default-200 rounded-lg bg-default-50">
        <h2 className="text-xl font-semibold">Using Mutation Options</h2>
        <p className="text-default-500">
          Both ConfirmationModal and DeleteModal support React Query's useMutation options:
        </p>
        
        <div className="space-y-2">
          <p className="font-medium">Available options include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><code>onSuccess</code> - Called when the operation succeeds</li>
            <li><code>onError</code> - Called when the operation fails</li>
            <li><code>onSettled</code> - Called when the operation completes (success or error)</li>
            <li><code>onMutate</code> - Called before the mutation function is fired</li>
          </ul>
          
          <p className="mt-2">
            The modals automatically handle loading states and error display, making it easy to
            integrate with async operations like API calls.
          </p>
        </div>
      </section>
    </div>
  );
}