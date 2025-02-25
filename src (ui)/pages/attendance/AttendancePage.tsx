import React from 'react';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { useAuth } from '../../context/AuthContext';
import { SuperAdminAttendance } from './components/SuperAdminAttendance';
import { AdminAttendance } from './components/AdminAttendance';
import { StudentAttendance } from './components/StudentAttendance';

export function AttendancePage() {
  const { user } = useAuth();

  if (!user) return null;

  const renderAttendanceView = () => {
    switch (user.role) {
      case 'SUPER_ADMIN':
        return <SuperAdminAttendance />;
      case 'ADMIN':
        return <AdminAttendance />;
      case 'STUDENT':
        return <StudentAttendance />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
        <p className="text-default-500">
          {user.role === 'SUPER_ADMIN' && 'Monitor and analyze attendance across all institutions'}
          {user.role === 'ADMIN' && 'Manage daily attendance records'}
          {user.role === 'STUDENT' && 'View your attendance history and statistics'}
        </p>
      </div>

      {renderAttendanceView()}
    </div>
  );
}