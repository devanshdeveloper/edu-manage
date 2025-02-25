import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Avatar,
  Chip,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Search, AlertTriangle, X, Plus, Clock } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Mock data for demonstration
const mockTeachers = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    subject: 'Physics',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    availability: 'available',
  },
  {
    id: '2',
    name: 'Prof. Michael Brown',
    subject: 'Mathematics',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    availability: 'assigned',
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    subject: 'English',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    availability: 'available',
  },
];

const TeacherCard = ({ teacher, isAssigned = false, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'teacher',
    item: { teacher },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isAssigned,
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`p-4 rounded-lg border ${
        isAssigned ? 'bg-content2' : 'bg-content1 cursor-move'
      }`}
    >
      <div className="flex items-center gap-3">
        <Avatar
          src={teacher.avatar}
          name={teacher.name}
          size="sm"
          isBordered
          color={teacher.availability === 'available' ? 'success' : 'default'}
        />
        <div className="flex-1">
          <p className="font-semibold">{teacher.name}</p>
          <p className="text-small text-default-500">{teacher.subject}</p>
        </div>
        {isAssigned && (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            onPress={() => onRemove(teacher)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

const AssignmentSlot = ({ onDrop, assignedTeacher, onRemove }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'teacher',
    drop: (item) => onDrop(item.teacher),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
        isOver ? 'border-primary bg-primary/10' : 'border-default-300'
      } ${assignedTeacher ? 'border-solid' : ''}`}
    >
      {assignedTeacher ? (
        <TeacherCard teacher={assignedTeacher} isAssigned onRemove={onRemove} />
      ) : (
        <div className="flex flex-col items-center justify-center h-24 text-default-500">
          <Plus className="w-6 h-6 mb-2" />
          <p className="text-small">Drag and drop a teacher here</p>
        </div>
      )}
    </div>
  );
};

const RoleModal = ({ isOpen, onClose, teacher, onAssign }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleAssign = () => {
    onAssign(teacher, selectedRole);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Assign Role to {teacher?.name}</ModalHeader>
        <ModalBody>
          <Select
            label="Select Role"
            placeholder="Choose a role"
            selectedKeys={selectedRole ? [selectedRole] : []}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <SelectItem key="lead">Lead Instructor</SelectItem>
            <SelectItem key="assistant">Assistant Teacher</SelectItem>
            <SelectItem key="substitute">Substitute Teacher</SelectItem>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleAssign}>
            Assign Role
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export function TeacherAssignmentView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [assignedTeachers, setAssignedTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrop = (teacher) => {
    if (!assignedTeachers.find((t) => t.id === teacher.id)) {
      setSelectedTeacher(teacher);
      onOpen();
    }
  };

  const handleAssignRole = (teacher, role) => {
    setAssignedTeachers([...assignedTeachers, { ...teacher, role }]);
  };

  const handleRemoveTeacher = (teacher) => {
    setAssignedTeachers(assignedTeachers.filter((t) => t.id !== teacher.id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Input
            isClearable
            className="w-full max-w-xs"
            placeholder="Search teachers..."
            startContent={<Search className="w-4 h-4 text-default-400" />}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <Tooltip content="View schedule conflicts">
            <Button
              variant="flat"
              color="warning"
              startContent={<Clock className="w-4 h-4" />}
            >
              Schedule Conflicts
            </Button>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-4">Available Teachers</h3>
              <div className="space-y-3">
                {filteredTeachers.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-4">Assigned Teachers</h3>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => {
                  const assignedTeacher = assignedTeachers[index];
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-small text-default-500">
                          Teaching Slot {index + 1}
                        </p>
                        {assignedTeacher && (
                          <Chip size="sm" variant="flat">
                            {assignedTeacher.role}
                          </Chip>
                        )}
                      </div>
                      <AssignmentSlot
                        onDrop={handleDrop}
                        assignedTeacher={assignedTeacher}
                        onRemove={handleRemoveTeacher}
                      />
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        <RoleModal
          isOpen={isOpen}
          onClose={onClose}
          teacher={selectedTeacher}
          onAssign={handleAssignRole}
        />
      </div>
    </DndProvider>
  );
}