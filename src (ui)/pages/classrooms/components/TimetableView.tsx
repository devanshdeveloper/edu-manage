import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  Tooltip,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { Clock, Plus, Edit3, X } from 'lucide-react';

interface TimetableViewProps {
  classrooms: any[];
  isLoading: boolean;
  error: string | null;
}

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

interface ClassSession {
  teacher: string;
  subject: string;
  avatar?: string;
}

interface TimetableData {
  [key: string]: {
    [key: string]: ClassSession;
  };
}

// Mock timetable data
const mockTimetable: TimetableData = {
  Monday: {
    '8:00 AM': { teacher: 'Dr. Sarah Wilson', subject: 'Physics', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    '9:00 AM': { teacher: 'Prof. Michael Brown', subject: 'Mathematics', avatar: 'https://i.pravatar.cc/150?u=michael' },
    '10:00 AM': { teacher: 'Ms. Emily Davis', subject: 'English', avatar: 'https://i.pravatar.cc/150?u=emily' },
  },
  Tuesday: {
    '8:00 AM': { teacher: 'Ms. Emily Davis', subject: 'English', avatar: 'https://i.pravatar.cc/150?u=emily' },
    '9:00 AM': { teacher: 'Dr. Sarah Wilson', subject: 'Physics', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    '10:00 AM': { teacher: 'Prof. Michael Brown', subject: 'Mathematics', avatar: 'https://i.pravatar.cc/150?u=michael' },
  },
};

interface ClassSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: Partial<ClassSession>) => void;
  initialData?: ClassSession;
  day: string;
  time: string;
}

const ClassSessionModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  day,
  time,
}: ClassSessionModalProps) => {
  const [formData, setFormData] = useState<Partial<ClassSession>>(initialData || {});

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Class Session' : 'Add Class Session'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p className="text-small text-default-500">
              {day} at {time}
            </p>
            <Select
              label="Teacher"
              placeholder="Select a teacher"
              selectedKeys={formData.teacher ? [formData.teacher] : []}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            >
              <SelectItem key="Dr. Sarah Wilson" value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
              <SelectItem key="Prof. Michael Brown" value="Prof. Michael Brown">Prof. Michael Brown</SelectItem>
              <SelectItem key="Ms. Emily Davis" value="Ms. Emily Davis">Ms. Emily Davis</SelectItem>
            </Select>
            <Select
              label="Subject"
              placeholder="Select a subject"
              selectedKeys={formData.subject ? [formData.subject] : []}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            >
              <SelectItem key="Physics" value="Physics">Physics</SelectItem>
              <SelectItem key="Mathematics" value="Mathematics">Mathematics</SelectItem>
              <SelectItem key="English" value="English">English</SelectItem>
            </Select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave}>
            {initialData ? 'Save Changes' : 'Add Session'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export function TimetableView({
  classrooms,
  isLoading,
  error,
}: TimetableViewProps) {
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [timetable, setTimetable] = useState<TimetableData>(mockTimetable);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string; session?: ClassSession } | null>(null);

  const handleAddSession = (day: string, time: string) => {
    setSelectedSlot({ day, time });
    onOpen();
  };

  const handleEditSession = (day: string, time: string, session: ClassSession) => {
    setSelectedSlot({ day, time, session });
    onOpen();
  };

  const handleSaveSession = (sessionData: Partial<ClassSession>) => {
    if (selectedSlot) {
      const { day, time } = selectedSlot;
      setTimetable((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          [time]: sessionData as ClassSession,
        },
      }));
    }
  };

  const handleDeleteSession = (day: string, time: string) => {
    setTimetable((prev) => {
      const newDay = { ...prev[day] };
      delete newDay[time];
      return {
        ...prev,
        [day]: newDay,
      };
    });
  };

  const renderTimeSlot = (day: string, time: string) => {
    const session = timetable[day]?.[time];

    if (!session) {
      return (
        <Button
          size="sm"
          variant="flat"
          className="w-full h-full min-h-[80px]"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => handleAddSession(day, time)}
        >
          Add Class
        </Button>
      );
    }

    return (
      <Card className="w-full">
        <CardBody className="p-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-small font-semibold">{session.subject}</span>
              <div className="flex gap-1">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => handleEditSession(day, time, session)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => handleDeleteSession(day, time)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar
                src={session.avatar}
                name={session.teacher}
                size="sm"
              />
              <span className="text-tiny text-default-500">{session.teacher}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-danger">Failed to load timetable data</p>
        <Button
          color="primary"
          className="mt-4"
          onPress={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Select
          label="Select Classroom"
          placeholder="Choose a classroom"
          className="max-w-xs"
          selectedKeys={selectedClassroom ? [selectedClassroom] : []}
          onChange={(e) => setSelectedClassroom(e.target.value)}
        >
          {classrooms.map((classroom) => (
            <SelectItem key={classroom.id} value={classroom.id}>
              {classroom.name}
            </SelectItem>
          ))}
        </Select>
        <Tooltip content="Check for scheduling conflicts">
          <Button
            variant="flat"
            color="warning"
            startContent={<Clock className="w-4 h-4" />}
          >
            View Conflicts
          </Button>
        </Tooltip>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-2">
            {/* Time slots column */}
            <div className="space-y-2">
              <div className="h-12 flex items-center justify-center">
                <Clock className="w-5 h-5 text-default-500" />
              </div>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-[88px] flex items-center justify-end pr-2 text-small text-default-500"
                >                {time}
                </div>
              ))}
            </div>

            {/* Days columns */}
            {weekDays.map((day) => (
              <div key={day} className="space-y-2">
                <div className="h-12 flex items-center justify-center font-semibold">
                  {day}
                </div>
                {timeSlots.map((time) => (
                  <div key={`${day}-${time}`} className="h-[88px]">
                    {renderTimeSlot(day, time)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedSlot && (
        <ClassSessionModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={handleSaveSession}
          initialData={selectedSlot.session}
          day={selectedSlot.day}
          time={selectedSlot.time}
        />
      )}
    </div>
  );
}