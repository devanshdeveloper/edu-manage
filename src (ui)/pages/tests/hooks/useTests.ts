import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockTests = [
  {
    id: '1',
    title: 'Mid-Term Mathematics Exam',
    subject: 'mathematics',
    startDate: '2024-03-15T09:00',
    duration: 120,
    status: 'scheduled',
    totalQuestions: 50,
    maxScore: 100,
    classrooms: ['10A', '10B'],
    createdBy: {
      name: 'Dr. Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
  },
  {
    id: '2',
    title: 'Physics Quiz - Chapter 5',
    subject: 'physics',
    startDate: '2024-03-10T10:30',
    duration: 45,
    status: 'completed',
    totalQuestions: 20,
    maxScore: 40,
    classrooms: ['11A'],
    createdBy: {
      name: 'Prof. Michael Brown',
      avatar: 'https://i.pravatar.cc/150?u=michael',
    },
  },
  {
    id: '3',
    title: 'English Literature Analysis',
    subject: 'english',
    startDate: '2024-03-20T14:00',
    duration: 90,
    status: 'draft',
    totalQuestions: 30,
    maxScore: 60,
    classrooms: ['10A', '10C'],
    createdBy: {
      name: 'Ms. Emily Davis',
      avatar: 'https://i.pravatar.cc/150?u=emily',
    },
  },
];

const mockStats = {
  totalTests: 48,
  activeTests: 12,
  averageScore: '76%',
  completionRate: '92%',
};

export function useTests() {
  const [tests, setTests] = useState(mockTests);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchTests = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTests(mockTests);
        setStats(mockStats);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch tests');
        setIsLoading(false);
      }
    };

    fetchTests();
  }, []);

  const deleteTest = async (id: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTests(prev => prev.filter(test => test.id !== id));
    } catch (err) {
      setError('Failed to delete test');
    }
  };

  const updateTestStatus = async (id: string, status: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTests(prev =>
        prev.map(test =>
          test.id === id ? { ...test, status } : test
        )
      );
    } catch (err) {
      setError('Failed to update test status');
    }
  };

  return {
    tests,
    stats,
    isLoading,
    error,
    deleteTest,
    updateTestStatus,
  };
}