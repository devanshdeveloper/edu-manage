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
} from '@nextui-org/react';
import {
  Calendar as CalendarIcon,
  Search,
  Users,
  Check,
  X,
  Clock,
  AlertCircle,
  Save,
  Edit3,
} from 'lucide-react';
import { AttendanceStats } from './AttendanceStats';
import { useAttendance } from '../hooks/useAttendance';

const statusColorMap = {
  present: "success",
  absent: "danger",
  late: "warning",
  excused: "default",
};

export function AdminAttendance() {
  const { stats, isLoading } = useAttendance();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Mock data for demonstration
  const students = [
    {
      id: '1',
      name: 'John Smith',
      class: '10A',
      status: 'present',
      avatar: 'https://i.pravatar.cc/150?u=john',
      notes: '',
    },
    {
      id: '2',
      name: 'Emma Wilson',
      class: '10A',
      status: 'late',
      avatar: 'https://i.pravatar.cc/150?u=emma',
      notes: 'Bus delay',
    },
    {
      id: '3',
      name: 'Michael Brown',
      class: '10A',
      status: 'absent',
      avatar: 'https://i.pravatar.cc/150?u=michael',
      notes: 'Medical appointment',
    },
  ];

  const handleStatusChange = (studentId: string, status: string) => {
    // TODO: Implement status change logic
  };

  const handleEditNotes = (student: any) => {
    setSelectedStudent(student);
    onOpen();
  };

  const handleSaveNotes = () => {
    // TODO: Implement notes saving logic
    onClose();
  };

  return (
    <div className="space-y-6">
      <AttendanceStats stats={stats} isLoading={isLoading} />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                startContent={<CalendarIcon className="w-4 h-4 text-default-400" />}
                className="w-full sm:w-auto"
              />
              <Select
                label="Class"
                placeholder="Select class"
                className="w-full sm:w-48"
              >
                <SelectItem key="10a" value="10a">Class 10-A</SelectItem>
                <SelectItem key="10b" value="10b">Class 10-B</SelectItem>
                <SelectItem key="10c" value="10c">Class 10-C</SelectItem>
              </Select>
            </div>
            <Input
              className="w-full sm:w-72"
              placeholder="Search students..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Search className="w-4 h-4 text-default-400" />}
            />
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  color="success"
                  variant="flat"
                  startContent={<Check className="w-4 h-4" />}
                >
                  Mark All Present
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Save className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </div>
              <span className="text-default-400 text-small">
                Showing {students.length} students
              </span>
            </div>

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
                      </div>
                      {student.notes && (
                        <p className="text-small text-default-500">
                          Note: {student.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <Tooltip content="Present">
                          <Button
                            isIconOnly
                            size="sm"
                            color={student.status === 'present' ? 'success' : 'default'}
                            variant={student.status === 'present' ? 'solid' : 'bordered'}
                            onPress={() => handleStatusChange(student.id, 'present')}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Late">
                          <Button
                            isIconOnly
                            size="sm"
                            color={student.status === 'late' ? 'warning' : 'default'}
                            variant={student.status === 'late' ? 'solid' : 'bordered'}
                            onPress={() => handleStatusChange(student.id, 'late')}
                          >
                            <Clock className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Absent">
                          <Button
                            isIconOnly
                            size="sm"
                            color={student.status === 'absent' ? 'danger' : 'default'}
                            variant={student.status === 'absent' ? 'solid' : 'bordered'}
                            onPress={() => handleStatusChange(student.id, 'absent')}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Excused">
                          <Button
                            isIconOnly
                            size="sm"
                            color={student.status === 'excused' ? 'primary' : 'default'}
                            variant={student.status === 'excused' ? 'solid' : 'bordered'}
                            onPress={() => handleStatusChange(student.id, 'excused')}
                          >
                            <AlertCircle className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                      </div>
                      <Tooltip content="Add Notes">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => handleEditNotes(student)}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Add Attendance Notes</ModalHeader>
          <ModalBody>
            <Input
              label="Notes"
              placeholder="Enter attendance notes..."
              value={selectedStudent?.notes}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSaveNotes}>
              Save Notes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}