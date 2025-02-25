import React from 'react';
import { Card, CardBody, CardHeader, Button, Divider } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { TestStats } from './components/TestStats';
import { TestsList } from './components/TestsList';
import { TestModal } from './components/TestModal';
import { useTests } from './hooks/useTests';
import { useDisclosure } from '@nextui-org/react';

export function TestsPage() {
  const {
    tests,
    isLoading,
    error,
    stats,
    deleteTest,
    updateTestStatus,
  } = useTests();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [selectedTest, setSelectedTest] = React.useState<any>(null);

  const handleEdit = (test: any) => {
    setSelectedTest(test);
    onModalOpen();
  };

  const handleAdd = () => {
    setSelectedTest(null);
    onModalOpen();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tests</h1>
          <p className="text-default-500">
            Create and manage tests for your classrooms
          </p>
        </div>
        <Button
          color="primary"
          endContent={<Plus className="w-4 h-4" />}
          onPress={handleAdd}
        >
          Create Test
        </Button>
      </div>

      <TestStats stats={stats} isLoading={isLoading} />

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Test Overview</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <TestsList
            tests={tests}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={deleteTest}
            onStatusChange={updateTestStatus}
          />
        </CardBody>
      </Card>

      <TestModal
        test={selectedTest}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </div>
  );
}