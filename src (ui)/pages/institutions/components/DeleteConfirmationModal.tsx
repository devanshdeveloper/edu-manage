import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  institution?: any;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  institution,
}: DeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex gap-1">Delete Institution</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="rounded-full bg-danger/10 p-4">
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">
                Are you sure you want to delete {institution?.name}?
              </p>
              <p className="text-sm text-default-500 mt-1">
                This action cannot be undone. All data associated with this
                institution will be permanently deleted.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" onPress={onConfirm}>
            Delete Institution
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}