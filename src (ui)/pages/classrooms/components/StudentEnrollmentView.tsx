import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Checkbox,
  Avatar,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from '@nextui-org/react';
import {
  Search,
  SlidersHorizontal,
  UserPlus,
  X,
  GraduationCap,
  Calendar,
  FileText,
} from 'lucide-react';

// Mock data for demonstration
const mockStudents = [
  {
    id: '1',
    name: 'John Smith',
    studentId: 'STU001',
    grade: '10',
    section: 'A',
    avatar: 'https://i.pravatar.cc/150?u=john',
    status: 'active',
    academicPerformance: 'Excellent',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    studentId: 'STU002',
    grade: '10',
    section: 'B',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    status: 'active',
    academicPerformance: 'Good',
  },
  {
    id: '3',
    name: 'Michael Brown',
    studentId: 'STU003',
    grade: '10',
    section: 'A',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    status: 'inactive',
    academicPerformance: 'Average',
  },
];

const StudentCard = ({ student, isEnrolled = false, onSelect, isSelected, onRemove }) => (
  <div className={`p-4 rounded-lg border ${isEnrolled ? 'bg-content2' : 'bg-content1'}`}>
    <div className="flex items-center gap-3">
      {!isEnrolled && (
        <Checkbox
          isSelected={isSelected}
          onValueChange={() => onSelect(student)}
          aria-label={`Select ${student.name}`}
        />
      )}
      <Avatar
        src={student.avatar}
        name={student.name}
        size="sm"
        isBordered
        color={student.status === 'active' ? 'success' : 'default'}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{student.name}</p>
          <Chip size="sm" variant="flat" color="primary">
            {student.academicPerformance}
          </Chip>
        </div>
        <p className="text-small text-default-500">
          ID: {student.studentId} • Grade {student.grade}-{student.section}
        </p>
      </div>
      {isEnrolled && (
        <Button
          isIconOnly
          size="sm"
          variant="light"
          color="danger"
          onPress={() => onRemove(student)}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  </div>
);

const EnrollmentModal = ({ isOpen, onClose, selectedStudents, onEnroll }) => {
  const [notes, setNotes] = useState('');

  const handleEnroll = () => {
    onEnroll(selectedStudents, notes);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Enroll Students</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Selected Students ({selectedStudents.length})</p>
              <div className="flex flex-wrap gap-2">
                {selectedStudents.map((student) => (
                  <Chip key={student.id} variant="flat">
                    {student.name}
                  </Chip>
                ))}
              </div>
            </div>
            <Textarea
              label="Enrollment Notes"
              placeholder="Add any notes about these students..."
              value={notes}
              onValueChange={setNotes}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleEnroll}>
            Confirm Enrollment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export function StudentEnrollmentView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredStudents = mockStudents.filter(
    (student) =>
      !enrolledStudents.find((s) => s.id === student.id) &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectStudent = (student) => {
    const isSelected = selectedStudents.find((s) => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleEnroll = (students, notes) => {
    const newEnrolledStudents = students.map((student) => ({
      ...student,
      enrollmentDate: new Date().toISOString(),
      notes,
    }));
    setEnrolledStudents([...enrolledStudents, ...newEnrolledStudents]);
    setSelectedStudents([]);
  };

  const handleRemoveStudent = (student) => {
    setEnrolledStudents(enrolledStudents.filter((s) => s.id !== student.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          isClearable
          className="w-full sm:max-w-xs"
          placeholder="Search students..."
          startContent={<Search className="w-4 h-4 text-default-400" />}
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<SlidersHorizontal className="w-4 h-4" />}
              >
                Filters
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Filter options">
              <DropdownItem key="grade">Filter by Grade</DropdownItem>
              <DropdownItem key="section">Filter by Section</DropdownItem>
              <DropdownItem key="performance">Filter by Performance</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            startContent={<UserPlus className="w-4 h-4" />}
            isDisabled={selectedStudents.length === 0}
            onPress={onOpen}
          >
            Enroll Selected ({selectedStudents.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Available Students</h3>
            </div>
            <div className="space-y-3">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onSelect={handleSelectStudent}
                  isSelected={selectedStudents.some((s) => s.id === student.id)}
                />
              ))}
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-default-500">
                  <FileText className="w-8 h-8 mx-auto mb-2" />
                  <p>No students found matching your search criteria</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Enrolled Students</h3>
            </div>
            <div className="space-y-3">
              {enrolledStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  isEnrolled
                  onRemove={handleRemoveStudent}
                />
              ))}
              {enrolledStudents.length === 0 && (
                <div className="text-center py-8 text-default-500">
                  <UserPlus className="w-8 h-8 mx-auto mb-2" />
                  <p>No students enrolled yet</p>
                  <p className="text-small">Select students from the list to enroll them</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      <EnrollmentModal
        isOpen={isOpen}
        onClose={onClose}
        selectedStudents={selectedStudents}
        onEnroll={handleEnroll}
      />
    </div>
  );
}