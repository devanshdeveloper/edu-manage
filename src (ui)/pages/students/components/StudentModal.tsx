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
  Calendar,
  MapPin,
  School,
  GraduationCap,
  BookOpen,
  Users,
  FileText,
} from 'lucide-react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: any;
}

const classes = [
  { label: 'Class 6', value: '6' },
  { label: 'Class 7', value: '7' },
  { label: 'Class 8', value: '8' },
  { label: 'Class 9', value: '9' },
  { label: 'Class 10', value: '10' },
  { label: 'Class 11', value: '11' },
  { label: 'Class 12', value: '12' },
];

const sections = [
  { label: 'Section A', value: 'A' },
  { label: 'Section B', value: 'B' },
  { label: 'Section C', value: 'C' },
  { label: 'Section D', value: 'D' },
];

export function StudentModal({
  isOpen,
  onClose,
  student,
}: StudentModalProps) {
  const isEditing = !!student;

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
            {isEditing ? 'Edit Student Profile' : 'Add New Student'}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex justify-center">
                <Avatar
                  src={student?.avatar}
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
                defaultValue={student?.name}
              />

              <Input
                endContent={<FileText className="w-4 h-4 text-default-400" />}
                label="Student ID"
                placeholder="Enter student ID"
                variant="bordered"
                defaultValue={student?.studentId}
              />

              <Input
                endContent={<Calendar className="w-4 h-4 text-default-400" />}
                label="Date of Birth"
                placeholder="Select date of birth"
                type="date"
                variant="bordered"
                defaultValue={student?.dob}
              />

              <Input
                endContent={<Phone className="w-4 h-4 text-default-400" />}
                label="Phone"
                placeholder="Enter phone number"
                type="tel"
                variant="bordered"
                defaultValue={student?.phone}
              />

              <Input
                endContent={<Mail className="w-4 h-4 text-default-400" />}
                label="Email"
                placeholder="Enter email address"
                type="email"
                variant="bordered"
                defaultValue={student?.email}
              />

              <Select
                endContent={<School className="w-4 h-4 text-default-400" />}
                label="Class"
                placeholder="Select class"
                variant="bordered"
                defaultSelectedKeys={student ? [student.class] : undefined}
              >
                {classes.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>
                    {cls.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                endContent={<Users className="w-4 h-4 text-default-400" />}
                label="Section"
                placeholder="Select section"
                variant="bordered"
                defaultSelectedKeys={student ? [student.section] : undefined}
              >
                {sections.map((section) => (
                  <SelectItem key={section.value} value={section.value}>
                    {section.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                endContent={<Calendar className="w-4 h-4 text-default-400" />}
                label="Admission Date"
                placeholder="Select admission date"
                type="date"
                variant="bordered"
                defaultValue={student?.joinDate}
              />

              <Input
                endContent={<GraduationCap className="w-4 h-4 text-default-400" />}
                label="Current GPA"
                placeholder="Enter current GPA"
                type="number"
                step="0.01"
                min="0"
                max="4"
                variant="bordered"
                defaultValue={student?.gpa}
              />

              <div className="md:col-span-2">
                <Textarea
                  endContent={<MapPin className="w-4 h-4 text-default-400" />}
                  label="Address"
                  placeholder="Enter full address"
                  variant="bordered"
                  defaultValue={student?.address}
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  endContent={<BookOpen className="w-4 h-4 text-default-400" />}
                  label="Additional Notes"
                  placeholder="Enter any additional notes or comments"
                  variant="bordered"
                  defaultValue={student?.notes}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Add Student'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}