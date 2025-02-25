import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import {
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
  User,
  Clock,
} from 'lucide-react';

interface FeeRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  feeRecord?: any;
}

const feeTypes = [
  { label: 'Tuition Fee', value: 'tuition' },
  { label: 'Library Fee', value: 'library' },
  { label: 'Laboratory Fee', value: 'laboratory' },
  { label: 'Transportation Fee', value: 'transportation' },
  { label: 'Examination Fee', value: 'examination' },
];

const paymentMethods = [
  { label: 'Cash', value: 'cash' },
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'Bank Transfer', value: 'bank_transfer' },
  { label: 'Online Payment', value: 'online_payment' },
];

export function FeeRecordModal({
  isOpen,
  onClose,
  feeRecord,
}: FeeRecordModalProps) {
  const isEditing = !!feeRecord;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex gap-1">
            {isEditing ? 'Edit Fee Record' : 'Add New Fee Record'}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                autoFocus
                endContent={<User className="w-4 h-4 text-default-400" />}
                label="Student Name"
                placeholder="Enter student name"
                variant="bordered"
                defaultValue={feeRecord?.studentName}
              />

              <Input
                endContent={<FileText className="w-4 h-4 text-default-400" />}
                label="Student ID"
                placeholder="Enter student ID"
                variant="bordered"
                defaultValue={feeRecord?.studentId}
              />

              <Select
                endContent={<FileText className="w-4 h-4 text-default-400" />}
                label="Fee Type"
                placeholder="Select fee type"
                variant="bordered"
                defaultSelectedKeys={feeRecord ? [feeRecord.type] : undefined}
              >
                {feeTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                endContent={<DollarSign className="w-4 h-4 text-default-400" />}
                label="Amount"
                placeholder="Enter amount"
                type="number"
                variant="bordered"
                defaultValue={feeRecord?.amount}
              />

              <Input
                endContent={<Calendar className="w-4 h-4 text-default-400" />}
                label="Due Date"
                placeholder="Select due date"
                type="date"
                variant="bordered"
                defaultValue={feeRecord?.dueDate}
              />

              <Select
                endContent={<CreditCard className="w-4 h-4 text-default-400" />}
                label="Payment Method"
                placeholder="Select payment method"
                variant="bordered"
                defaultSelectedKeys={feeRecord ? [feeRecord.paymentMethod] : undefined}
              >
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                endContent={<Clock className="w-4 h-4 text-default-400" />}
                label="Payment Schedule"
                placeholder="Enter payment schedule"
                variant="bordered"
                defaultValue={feeRecord?.paymentSchedule}
              />

              <Input
                endContent={<FileText className="w-4 h-4 text-default-400" />}
                label="Invoice Number"
                placeholder="Enter invoice number"
                variant="bordered"
                defaultValue={feeRecord?.invoiceNumber}
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Additional Notes"
                  placeholder="Enter any additional notes"
                  variant="bordered"
                  defaultValue={feeRecord?.notes}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {isEditing ? 'Update Record' : 'Add Record'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}