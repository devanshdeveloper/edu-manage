import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockTeachers = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    employeeId: 'TCH001',
    email: 'sarah.wilson@school.edu',
    phone: '+1 (555) 123-4567',
    department: 'Science',
    subjects: ['Physics', 'Chemistry'],
    status: 'active',
    experience: 8,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    joinDate: '2016-08-15',
    address: '123 Education St, Academic City',
    qualifications: 'Ph.D. in Physics, M.Sc. in Chemistry',
  },
  {
    id: '2',
    name: 'Prof. Michael Brown',
    employeeId: 'TCH002',
    email: 'michael.brown@school.edu',
    phone: '+1 (555) 234-5678',
    department: 'Mathematics',
    subjects: ['Algebra', 'Calculus'],
    status: 'active',
    experience: 12,
    avatar: 'https://i.pravatar.cc/150?u=michael',
    joinDate: '2012-06-20',
    address: '456 Learning Ave, Knowledge Park',
    qualifications: 'M.Sc. in Mathematics, B.Ed.',
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    employeeId: 'TCH003',
    email: 'emily.davis@school.edu',
    phone: '+1 (555) 345-6789',
    department: 'English',
    subjects: ['Literature', 'Grammar'],
    status: 'onLeave',
    experience: 5,
    avatar: 'https://i.pravatar.cc/150?u=emily',
    joinDate: '2019-01-10',
    address: '789 Wisdom Rd, Scholar Valley',
    qualifications: 'M.A. in English Literature, TEFL Certification',
  },
];

const mockStats = {
  totalTeachers: 48,
  activeTeachers: 45,
  averageExperience: '7.5 years',
  subjectsCovered: 12,
};

export function useTeachers() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchTeachers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTeachers(mockTeachers);
        setStats(mockStats);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch teachers');
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const deleteTeacher = async (id: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTeachers(prev => prev.filter(teacher => teacher.id !== id));
    } catch (err) {
      setError('Failed to delete teacher');
    }
  };

  const updateTeacherStatus = async (id: string, status: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTeachers(prev =>
        prev.map(teacher =>
          teacher.id === id ? { ...teacher, status } : teacher
        )
      );
    } catch (err) {
      setError('Failed to update teacher status');
    }
  };

  return {
    teachers,
    stats,
    isLoading,
    error,
    deleteTeacher,
    updateTeacherStatus,
  };
}