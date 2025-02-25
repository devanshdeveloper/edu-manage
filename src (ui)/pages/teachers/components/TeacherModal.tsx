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
  Avatar,
} from '@nextui-org/react';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  FileText,
  Clock,
} from 'lucide-react';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher?: any;
}

const departments = [
  { label: 'Mathematics', value: 'mathematics' },
  { label: 'Science', value: 'science' },
  { label: 'English', value: 'english' },
  { label: 'History', value: 'history' },
  { label: 'Computer Science', value: 'computer-science' },
];

const subjects = [
  { label: 'Algebra', value: 'algebra' },
  { label: 'Geometry', value: 'geometry' },
  { label: 'Physics', value: 'physics' },
  { label: 'Chemistry', value: 'chemistry' },
  { label: 'Biology', value: 'biology' },
  { label: 'Literature', value: 'literature' },
  { label: 'Grammar', value: 'grammar' },
  { label: 'World History', value: 'world-history' },
  { label: 'Programming', value: 'programming' },
];

export function TeacherModal({
  isOpen,
  onClose,
  teacher,
}: TeacherModalProps) {
  const isEditing = !!teacher;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex gap-1">
            {isEditing ? 'Edit Teacher Profile' : 'Add New Teacher'}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex justify-center">
                <Avatar
                  src={teacher?.avatar}
                  className="w-24 h-24"
                  isBordered
                  color="primary"
                />
              </div>

              <Input
                autoFocus
                endContent={<User className="w-4 h-4 text-default-400" />}
                label="Full Name"
                placeholder="Enter full name"
                variant="bordered"
                defaultValue={teacher?.name}
              />

              <Input
                endContent={<FileText className="w-4 h-4 text-default-400" />}
                label="Employee ID"
                placeholder="Enter employee ID"
                variant="bordered"
                defaultValue={teacher?.employeeId}
              />

              <Input
                endContent={<Mail className="w-4 h-4 text-default-400" />}
                label="Email"
                placeholder="Enter email address"
                type="email"
                variant="bordered"
                defaultValue={teacher?.email}
              />

              <Input
                endContent={<Phone className="w-4 h-4 text-default-400" />}
                label="Phone"
                placeholder="Enter phone number"
                type="tel"
                variant="bordered"
                defaultValue={teacher?.phone}
              />

              <Select
                endContent={<GraduationCap className="w-4 h-4 text-default-400" />}
                label="Department"
                placeholder="Select department"
                variant="bordered"
                defaultSelectedKeys={teacher ? [teacher.department] : undefined}
              >
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                endContent={<BookOpen className="w-4 h-4 text-default-400" />}
                label="Subjects"
                placeholder="Select subjects"
                variant="bordered"
                selectionMode="multiple"
                defaultSelectedKeys={teacher?.subjects}
              >
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                endContent={<Calendar className="w-4 h-4 text-default-400" />}
                label="Join Date"
                placeholder="Select join date"
                type="date"
                variant="bordered"
                defaultValue={teacher?.joinDate}
              />

              <Input
                endContent={<Clock className="w-4 h-4 text-default-400" />}
                label="Experience (Years)"
                placeholder="Enter years of experience"
                type="number"
                variant="bordered"
                defaultValue={teacher?.experience}
              />

              <div className="md:col-span-2">
                <Textarea
                  endContent={<MapPin className="w-4 h-4 text-default-400" />}
                  label="Address"
                  placeholder="Enter full address"
                  variant="bordered"
                  defaultValue={teacher?.address}
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Qualifications"
                  placeholder="Enter educational qualifications"
                  variant="bordered"
                  defaultValue={teacher?.qualifications}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Add Teacher'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}