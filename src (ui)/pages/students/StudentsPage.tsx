import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  useDisclosure,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { StudentsList } from './components/StudentsList';
import { StudentModal } from './components/StudentModal';
import { StudentStats } from './components/StudentStats';
import { useStudents } from './hooks/useStudents';

export function StudentsPage() {
  const {
    students,
    isLoading,
    error,
    stats,
    deleteStudent,
    updateStudentStatus,
  } = useStudents();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [selectedStudent, setSelectedStudent] = React.useState<any>(null);

  const handleEdit = (student: any) => {
    setSelectedStudent(student);
    onModalOpen();
  };

  const handleAdd = () => {
    setSelectedStudent(null);
    onModalOpen();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-default-500">
            Manage student profiles and academic records
          </p>
        </div>
        <Button
          color="primary"
          endContent={<Plus className="w-4 h-4" />}
          onPress={handleAdd}
        >
          Add Student
        </Button>
      </div>

      <StudentStats stats={stats} isLoading={isLoading} />

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Student Directory</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <StudentsList
            students={students}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={deleteStudent}
            onStatusChange={updateStudentStatus}
          />
        </CardBody>
      </Card>

      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </div>
  );
}