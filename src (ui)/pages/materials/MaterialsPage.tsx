import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SuperAdminMaterials } from './components/SuperAdminMaterials';
import { AdminMaterials } from './components/AdminMaterials';
import { StudentMaterials } from './components/StudentMaterials';

export function MaterialsPage() {
  const { user } = useAuth();

  if (!user) return null;

  const renderMaterialsView = () => {
    switch (user.role) {
      case 'SUPER_ADMIN':
        return <SuperAdminMaterials />;
      case 'ADMIN':
        return <AdminMaterials />;
      case 'STUDENT':
        return <StudentMaterials />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Learning Materials</h1>
        <p className="text-default-500">
          {user.role === 'SUPER_ADMIN' && 'Manage and monitor study materials across all institutions'}
          {user.role === 'ADMIN' && 'Upload and manage study materials for your classrooms'}
          {user.role === 'STUDENT' && 'Access your classroom study materials'}
        </p>
      </div>

      {renderMaterialsView()}
    </div>
  );
}