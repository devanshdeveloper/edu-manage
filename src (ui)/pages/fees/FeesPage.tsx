import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SuperAdminFees } from './components/SuperAdminFees';
import { AdminFees } from './components/AdminFees';
import { StudentFees } from './components/StudentFees';

export function FeesPage() {
  const { user } = useAuth();

  if (!user) return null;

  const renderFeesView = () => {
    switch (user.role) {
      case 'SUPER_ADMIN':
        return <SuperAdminFees />;
      case 'ADMIN':
        return <AdminFees />;
      case 'STUDENT':
        return <StudentFees />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fees Management</h1>
        <p className="text-default-500">
          {user.role === 'SUPER_ADMIN' && 'Monitor and analyze fee collection across all institutions'}
          {user.role === 'ADMIN' && 'Manage student fees and payment records'}
          {user.role === 'STUDENT' && 'View and pay your fees'}
        </p>
      </div>

      {renderFeesView()}
    </div>
  );
}