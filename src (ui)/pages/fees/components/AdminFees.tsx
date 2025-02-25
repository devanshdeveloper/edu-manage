import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Button,
  Select,
  SelectItem,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Textarea
  
} from '@nextui-org/react';
import {
  Search,
  Plus,
  Download,
  Send,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Edit3,
} from 'lucide-react';
import { FeesStats } from './FeesStats';
import { useFees } from '../hooks/useFees';
import { FeeRecordModal } from './FeeRecordModal';

const statusColorMap = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
  partial: "primary",
};

export function AdminFees() {
  const { stats, isLoading } = useFees();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen: isPaymentModalOpen, onOpen: onPaymentModalOpen, onClose: onPaymentModalClose } = useDisclosure();
  const { isOpen: isFeeModalOpen, onOpen: onFeeModalOpen, onClose: onFeeModalClose } = useDisclosure();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Mock data for demonstration
  const students = [
    {
      id: '1',
      name: 'John Smith',
      class: '10A',
      feeAmount: 1200,
      dueDate: '2024-03-15',
      status: 'paid',
      avatar: 'https://i.pravatar.cc/150?u=john',
    },
    {
      id: '2',
      name: 'Emma Wilson',
      class: '10A',
      feeAmount: 1200,
      dueDate: '2024-03-15',
      status: 'pending',
      avatar: 'https://i.pravatar.cc/150?u=emma',
    },
    {
      id: '3',
      name: 'Michael Brown',
      class: '10A',
      feeAmount: 1200,
      dueDate: '2024-02-15',
      status: 'overdue',
      avatar: 'https://i.pravatar.cc/150?u=michael',
    },
  ];

  const handleRecordPayment = (student: any) => {
    setSelectedStudent(student);
    onPaymentModalOpen();
  };

  const handleSavePayment = () => {
    // TODO: Implement payment saving logic
    onPaymentModalClose();
  };

  const handleSendReminder = (studentId: string) => {
    // TODO: Implement reminder sending logic
  };

  return (
    <div className="space-y-6">
      <FeesStats stats={stats} isLoading={isLoading} />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                label="Class"
                placeholder="Select class"
                className="w-full sm:w-48"
              >
                <SelectItem key="10a" value="10a">Class 10-A</SelectItem>
                <SelectItem key="10b" value="10b">Class 10-B</SelectItem>
                <SelectItem key="10c" value="10c">Class 10-C</SelectItem>
              </Select>

              <Select
                label="Fee Status"
                placeholder="Filter by status"
                className="w-full sm:w-48"
              >
                <SelectItem key="all" value="all">All Status</SelectItem>
                <SelectItem key="paid" value="paid">Paid</SelectItem>
                <SelectItem key="pending" value="pending">Pending</SelectItem>
                <SelectItem key="overdue" value="overdue">Overdue</SelectItem>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                color="primary"
                variant="flat"
                startContent={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
              <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={onFeeModalOpen}
              >
                Add Fee Record
              </Button>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            <Input
              className="w-full sm:max-w-md"
              placeholder="Search students..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Search className="w-4 h-4 text-default-400" />}
            />

            <div className="space-y-3">
              {students.map((student) => (
                <Card key={student.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-small text-default-500">
                          Class {student.class}
                        </p>
                        <Chip
                          size="sm"
                          color={statusColorMap[student.status as keyof typeof statusColorMap]}
                        >
                          {student.status}
                        </Chip>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-small text-default-500">
                          Amount: ${student.feeAmount}
                        </p>
                        <p className="text-small text-default-500">
                          Due: {student.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tooltip content="Record Payment">
                        <Button
                          isIconOnly
                          size="sm"
                          color="primary"
                          variant="flat"
                          onPress={() => handleRecordPayment(student)}
                        >
                          <CreditCard className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Send Reminder">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onPress={() => handleSendReminder(student.id)}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Edit Record">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isPaymentModalOpen} onClose={onPaymentModalClose} size="lg">
        <ModalContent>
          <ModalHeader>Record Fee Payment</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-default-100">
                <img
                  src={selectedStudent?.avatar}
                  alt={selectedStudent?.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{selectedStudent?.name}</p>
                  <p className="text-small text-default-500">
                    Class {selectedStudent?.class}
                  </p>
                </div>
              </div>

              <Input
                type="number"
                label="Payment Amount"
                placeholder="Enter amount"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />

              <Select label="Payment Method">
                <SelectItem key="cash" value="cash">Cash</SelectItem>
                <SelectItem key="card" value="card">Credit/Debit Card</SelectItem>
                <SelectItem key="bank" value="bank">Bank Transfer</SelectItem>
              </Select>

              <Input
                type="text"
                label="Reference Number"
                placeholder="Enter reference number (optional)"
              />

              <Textarea
                label="Notes"
                placeholder="Add any additional notes"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onPaymentModalClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSavePayment}>
              Record Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FeeRecordModal
        isOpen={isFeeModalOpen}
        onClose={onFeeModalClose}
      />
    </div>
  );
}