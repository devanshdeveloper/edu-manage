import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Tabs,
  Tab,
  useDisclosure,
} from '@nextui-org/react';
import {
  Plus,
  LayoutGrid,
  Calendar,
  Users,
  GraduationCap,
} from 'lucide-react';
import { ClassroomsList } from './components/ClassroomsList';
import { ClassroomModal } from './components/ClassroomModal';
import { ClassroomStats } from './components/ClassroomStats';
import { TimetableView } from './components/TimetableView';
import { TeacherAssignmentView } from './components/TeacherAssignmentView';
import { StudentEnrollmentView } from './components/StudentEnrollmentView';
import { useClassrooms } from './hooks/useClassrooms';

export function ClassroomsPage() {
  const {
    classrooms,
    isLoading,
    error,
    stats,
    deleteClassroom,
    updateClassroomStatus,
  } = useClassrooms();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [selectedClassroom, setSelectedClassroom] = React.useState<any>(null);
  const [selectedView, setSelectedView] = React.useState<string>("list");

  const handleEdit = (classroom: any) => {
    setSelectedClassroom(classroom);
    onModalOpen();
  };

  const handleAdd = () => {
    setSelectedClassroom(null);
    onModalOpen();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Classrooms</h1>
          <p className="text-default-500">
            Manage classrooms, assignments, and schedules
          </p>
        </div>
        <Button
          color="primary"
          endContent={<Plus className="w-4 h-4" />}
          onPress={handleAdd}
        >
          Create Classroom
        </Button>
      </div>

      <ClassroomStats stats={stats} isLoading={isLoading} />

      <Card>
        <CardHeader>
          <Tabs 
            aria-label="Classroom views"
            selectedKey={selectedView}
            onSelectionChange={(key) => setSelectedView(key as string)}
          >
            <Tab
              key="list"
              title={
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  <span>All Classrooms</span>
                </div>
              }
            />
            <Tab
              key="timetable"
              title={
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Timetable</span>
                </div>
              }
            />
            <Tab
              key="teachers"
              title={
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Teacher Assignments</span>
                </div>
              }
            />
            <Tab
              key="students"
              title={
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Enrollment</span>
                </div>
              }
            />
          </Tabs>
        </CardHeader>
        <Divider />
        <CardBody>
          {selectedView === "list" && (
            <ClassroomsList
              classrooms={classrooms}
              isLoading={isLoading}
              error={error}
              onEdit={handleEdit}
              onDelete={deleteClassroom}
              onStatusChange={updateClassroomStatus}
            />
          )}
          {selectedView === "timetable" && (
            <TimetableView
              classrooms={classrooms}
              isLoading={isLoading}
              error={error}
            />
          )}
          {selectedView === "teachers" && (
            <TeacherAssignmentView />
          )}
          {selectedView === "students" && (
            <StudentEnrollmentView />
          )}
        </CardBody>
      </Card>

      <ClassroomModal
        classroom={selectedClassroom}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </div>
  );
}