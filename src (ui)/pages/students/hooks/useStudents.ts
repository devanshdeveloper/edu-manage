import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockStudents = [
  {
    id: '1',
    name: 'John Smith',
    studentId: 'STU001',
    email: 'john.smith@school.edu',
    phone: '+1 (555) 123-4567',
    class: '10',
    section: 'A',
    status: 'active',
    gpa: '3.8',
    avatar: 'https://i.pravatar.cc/150?u=john',
    joinDate: '2023-08-15',
    address: '123 Student Ave, Academic City',
    dob: '2008-05-20',
    notes: 'Excellent performance in Mathematics and Science',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    studentId: 'STU002',
    email: 'emma.wilson@school.edu',
    phone: '+1 (555) 234-5678',
    class: '9',
    section: 'B',
    status: 'active',
    gpa: '3.5',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    joinDate: '2023-08-15',
    address: '456 Learning St, Knowledge Park',
    dob: '2009-03-15',
    notes: 'Active participant in school sports',
  },
  {
    id: '3',
    name: 'Michael Brown',
    studentId: 'STU003',
    email: 'michael.brown@school.edu',
    phone: '+1 (555) 345-6789',
    class: '11',
    section: 'A',
    status: 'suspended',
    gpa: '2.9',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    joinDate: '2022-08-15',
    address: '789 Education Rd, Scholar Valley',
    dob: '2007-11-30',
    notes: 'Needs improvement in attendance',
  },
];

const mockStats = {
  totalStudents: 1245,
  activeStudents: 1180,
  averageGPA: '3.4',
  enrollmentRate: '94%',
};

export function useStudents() {
  const [students, setStudents] = useState(mockStudents);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchStudents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStudents(mockStudents);
        setStats(mockStats);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch students');
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const deleteStudent = async (id: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStudents(prev => prev.filter(student => student.id !== id));
    } catch (err) {
      setError('Failed to delete student');
    }
  };

  const updateStudentStatus = async (id: string, status: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStudents(prev =>
        prev.map(student =>
          student.id === id ? { ...student, status } : student
        )
      );
    } catch (err) {
      setError('Failed to update student status');
    }
  };

  return {
    students,
    stats,
    isLoading,
    error,
    deleteStudent,
    updateStudentStatus,
  };
}