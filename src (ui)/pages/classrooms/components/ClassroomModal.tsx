import React, { useState } from 'react';
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
  Tabs,
  Tab,
  Card,
  CardBody,
  Chip,
  Avatar,
  Checkbox,
} from '@nextui-org/react';
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  Monitor,
  Wifi,
  Printer,
  Projector,
  Speaker,
  Search,
} from 'lucide-react';

interface ClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroom?: any;
}

const buildings = [
  { label: 'Main Building', value: 'main' },
  { label: 'Science Block', value: 'science' },
  { label: 'Arts Block', value: 'arts' },
  { label: 'Technology Wing', value: 'tech' },
];

const resources = [
  { label: 'Projector', value: 'projector', icon: Projector },
  { label: 'Computer', value: 'computer', icon: Monitor },
  { label: 'Wi-Fi', value: 'wifi', icon: Wifi },
  { label: 'Printer', value: 'printer', icon: Printer },
  { label: 'Sound System', value: 'sound', icon: Speaker },
];

export function ClassroomModal({
  isOpen,
  onClose,
  classroom,
}: ClassroomModalProps) {
  const isEditing = !!classroom;
  const [activeTab, setActiveTab] = useState("details");
  const [selectedTeachers, setSelectedTeachers] = useState<Set<string>>(new Set([]));
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set([]));

  // Mock data for teachers and students
  const mockTeachers = [
    { id: '1', name: 'Dr. Sarah Wilson', subject: 'Physics', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: '2', name: 'Prof. Michael Brown', subject: 'Mathematics', avatar: 'https://i.pravatar.cc/150?u=michael' },
    { id: '3', name: 'Ms. Emily Davis', subject: 'English', avatar: 'https://i.pravatar.cc/150?u=emily' },
  ];

  const mockStudents = [
    { id: '1', name: 'John Smith', class: '10A', avatar: 'https://i.pravatar.cc/150?u=john' },
    { id: '2', name: 'Emma Wilson', class: '10A', avatar: 'https://i.pravatar.cc/150?u=emma' },
    { id: '3', name: 'Michael Brown', class: '10A', avatar: 'https://i.pravatar.cc/150?u=michael' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    onClose();
  };

  const renderDetailsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        autoFocus
        endContent={<Building2 className="w-4 h-4 text-default-400" />}
        label="Classroom Name"
        placeholder="Enter classroom name"
        variant="bordered"
        defaultValue={classroom?.name}
      />

      <Input
        endContent={<Users className="w-4 h-4 text-default-400" />}
        label="Capacity"
        placeholder="Enter maximum capacity"
        type="number"
        variant="bordered"
        defaultValue={classroom?.capacity}
      />

      <Select
        endContent={<MapPin className="w-4 h-4 text-default-400" />}
        label="Building/Location"
        placeholder="Select building"
        variant="bordered"
        defaultSelectedKeys={classroom ? [classroom.building] : undefined}
      >
        {buildings.map((building) => (
          <SelectItem key={building.value} value={building.value}>
            {building.label}
          </SelectItem>
        ))}
      </Select>

      <Input
        endContent={<MapPin className="w-4 h-4 text-default-400" />}
        label="Room Number"
        placeholder="Enter room number"
        variant="bordered"
        defaultValue={classroom?.roomNumber}
      />

      <div className="md:col-span-2">
        <p className="text-small mb-2">Available Resources</p>
        <div className="flex flex-wrap gap-2">
          {resources.map((resource) => (
            <Checkbox
              key={resource.value}
              value={resource.value}
              defaultSelected={classroom?.resources?.includes(resource.value)}
            >
              <div className="flex items-center gap-1">
                <resource.icon className="w-4 h-4" />
                <span>{resource.label}</span>
              </div>
            </Checkbox>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <Textarea
          label="Additional Notes"
          placeholder="Enter any additional notes or requirements"
          variant="bordered"
          defaultValue={classroom?.notes}
        />
      </div>
    </div>
  );

  const renderTeachersTab = () => (
    <div className="space-y-4">
      <Input
        startContent={<Search className="w-4 h-4 text-default-400" />}
        placeholder="Search teachers..."
        variant="bordered"
      />
      <div className="grid grid-cols-1 gap-2">
        {mockTeachers.map((teacher) => (
          <Card
            key={teacher.id}
            isPressable
            isHoverable
            className={selectedTeachers.has(teacher.id) ? 'border-primary' : ''}
            onPress={() => {
              const newSelection = new Set(selectedTeachers);
              if (newSelection.has(teacher.id)) {
                newSelection.delete(teacher.id);
              } else {
                newSelection.add(teacher.id);
              }
              setSelectedTeachers(newSelection);
            }}
          >
            <CardBody className="flex flex-row items-center gap-4">
              <Avatar
                src={teacher.avatar}
                name={teacher.name}
                size="sm"
                isBordered={selectedTeachers.has(teacher.id)}
                color="primary"
              />
              <div className="flex-1">
                <p className="font-semibold">{teacher.name}</p>
                <p className="text-small text-default-500">{teacher.subject}</p>
              </div>
              <Checkbox
                isSelected={selectedTeachers.has(teacher.id)}
                onChange={() => {}}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStudentsTab = () => (
    <div className="space-y-4">
      <Input
        startContent={<Search className="w-4 h-4 text-default-400" />}
        placeholder="Search students..."
        variant="bordered"
      />
      <div className="grid grid-cols-1 gap-2">
        {mockStudents.map((student) => (
          <Card
            key={student.id}
            isPressable
            isHoverable
            className={selectedStudents.has(student.id) ? 'border-primary' : ''}
            onPress={() => {
              const newSelection = new Set(selectedStudents);
              if (newSelection.has(student.id)) {
                newSelection.delete(student.id);
              } else {
                newSelection.add(student.id);
              }
              setSelectedStudents(newSelection);
            }}
          >
            <CardBody className="flex flex-row items-center gap-4">
              <Avatar
                src={student.avatar}
                name={student.name}
                size="sm"
                isBordered={selectedStudents.has(student.id)}
                color="primary"
              />
              <div className="flex-1">
                <p className="font-semibold">{student.name}</p>
                <p className="text-small text-default-500">Class {student.class}</p>
              </div>
              <Checkbox
                isSelected={selectedStudents.has(student.id)}
                onChange={() => {}}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );

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
            {isEditing ? 'Edit Classroom' : 'Create New Classroom'}
          </ModalHeader>
          <ModalBody>
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
            >
              <Tab
                key="details"
                title={
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Details</span>
                  </div>
                }
              >
                {renderDetailsTab()}
              </Tab>
              <Tab
                key="teachers"
                title={
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Teachers</span>
                  </div>
                }
              >
                {renderTeachersTab()}
              </Tab>
              <Tab
                key="students"
                title={
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Students</span>
                  </div>
                }
              >
                {renderStudentsTab()}
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Create Classroom'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}