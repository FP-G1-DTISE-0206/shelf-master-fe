import React from "react";
import { Modal, Button } from "flowbite-react";

interface ConfirmationModalProps {
  isOpen: boolean; // Controls modal visibility
  onClose: () => void; // Triggered when canceling/closing
  onConfirm: () => void; // Triggered on confirmation
  title?: string; // Optional title for the modal
  message?: string; // Optional message for the modal
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
}) => {
  return (
    <Modal show={isOpen} onClose={onClose} size="md" popup={true}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
            {message}
          </p>
          <div className="flex justify-center gap-4">
            <Button color="light" onClick={onClose}>
              Cancel
            </Button>
            <Button color="warning" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
