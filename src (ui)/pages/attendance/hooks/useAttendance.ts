import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockStats = {
  totalPresent: 450,
  attendanceRate: '92%',
  lateArrivals: 25,
  absences: 15,
};

const mockAttendanceData = [
  { date: 'Mon', attendance: 95 },
  { date: 'Tue', attendance: 88 },
  { date: 'Wed', attendance: 92 },
  { date: 'Thu', attendance: 96 },
  { date: 'Fri', attendance: 90 },
];

export function useAttendance() {
  const [stats, setStats] = useState(mockStats);
  const [attendanceData, setAttendanceData] = useState(mockAttendanceData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchAttendanceData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
        setAttendanceData(mockAttendanceData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch attendance data');
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  return {
    stats,
    attendanceData,
    isLoading,
    error,
  };
}