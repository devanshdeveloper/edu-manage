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
import { TeachersList } from './components/TeachersList';
import { TeacherModal } from './components/TeacherModal';
import { TeacherStats } from './components/TeacherStats';
import { useTeachers } from './hooks/useTeachers';

export function TeachersPage() {
  const {
    teachers,
    isLoading,
    error,
    stats,
    deleteTeacher,
    updateTeacherStatus,
  } = useTeachers();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [selectedTeacher, setSelectedTeacher] = React.useState<any>(null);

  const handleEdit = (teacher: any) => {
    setSelectedTeacher(teacher);
    onModalOpen();
  };

  const handleAdd = () => {
    setSelectedTeacher(null);
    onModalOpen();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Teachers</h1>
          <p className="text-default-500">
            Manage teacher profiles and assignments
          </p>
        </div>
        <Button
          color="primary"
          endContent={<Plus className="w-4 h-4" />}
          onPress={handleAdd}
        >
          Add Teacher
        </Button>
      </div>

      <TeacherStats stats={stats} isLoading={isLoading} />

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Teacher Directory</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <TeachersList
            teachers={teachers}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={deleteTeacher}
            onStatusChange={updateTeacherStatus}
          />
        </CardBody>
      </Card>

      <TeacherModal
        teacher={selectedTeacher}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </div>
  );
}