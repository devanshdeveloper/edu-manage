import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockClassrooms = [
  {
    id: '1',
    name: 'Science Lab A',
    roomNumber: '101',
    location: 'Science Block',
    capacity: 30,
    resources: ['Projector', 'Computer', 'Lab Equipment'],
    status: 'active',
    teacherCount: 4,
    studentCount: 25,
  },
  {
    id: '2',
    name: 'Computer Lab',
    roomNumber: '201',
    location: 'Technology Wing',
    capacity: 25,
    resources: ['Computers', 'Projector', 'Printer'],
    status: 'active',
    teacherCount: 2,
    studentCount: 20,
  },
  {
    id: '3',
    name: 'Lecture Hall',
    roomNumber: '301',
    location: 'Main Building',
    capacity: 100,
    resources: ['Projector', 'Sound System'],
    status: 'maintenance',
    teacherCount: 6,
    studentCount: 85,
  },
];

const mockStats = {
  totalClassrooms: 15,
  activeClassrooms: 12,
  totalCapacity: 450,
  utilizationRate: '85%',
};

export function useClassrooms() {
  const [classrooms, setClassrooms] = useState(mockClassrooms);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchClassrooms = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClassrooms(mockClassrooms);
        setStats(mockStats);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch classrooms');
        setIsLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  const deleteClassroom = async (id: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setClassrooms(prev => prev.filter(classroom => classroom.id !== id));
    } catch (err) {
      setError('Failed to delete classroom');
    }
  };

  const updateClassroomStatus = async (id: string, status: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setClassrooms(prev =>
        prev.map(classroom =>
          classroom.id === id ? { ...classroom, status } : classroom
        )
      );
    } catch (err) {
      setError('Failed to update classroom status');
    }
  };

  return {
    classrooms,
    stats,
    isLoading,
    error,
    deleteClassroom,
    updateClassroomStatus,
  };
}