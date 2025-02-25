import React from 'react';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import {
  Plus,
  FileText,
  Users,
  GraduationCap,
  Building2,
  Wallet,
  BookOpen,
  TestTube2,
  CreditCard,
} from 'lucide-react';
import type { UserRole } from '../../../types/auth';

interface QuickActionsProps {
  role: UserRole;
}

export function QuickActions({ role }: QuickActionsProps) {
  const getActions = () => {
    switch (role) {
      case 'SUPER_ADMIN':
        return [
          { label: 'Add Institution', icon: <Building2 className="w-4 h-4" /> },
          { label: 'New Subscription', icon: <Wallet className="w-4 h-4" /> },
          { label: 'Generate Invoice', icon: <FileText className="w-4 h-4" /> },
        ];
      case 'ADMIN':
        return [
          { label: 'Add Teacher', icon: <Users className="w-4 h-4" /> },
          { label: 'Add Student', icon: <GraduationCap className="w-4 h-4" /> },
          { label: 'Create Class', icon: <BookOpen className="w-4 h-4" /> },
        ];
      case 'STUDENT':
        return [
          { label: 'View Materials', icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Take Test', icon: <TestTube2 className="w-4 h-4" /> },
          { label: 'Pay Fees', icon: <CreditCard className="w-4 h-4" /> },
        ];
      default:
        return [];
    }
  };

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <Plus className="w-6 h-6" />
        <div className="flex flex-col">
          <p className="text-md font-semibold">Quick Actions</p>
          <p className="text-small text-default-500">Frequently used actions</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-wrap gap-4">
          {getActions().map((action) => (
            <Button
              key={action.label}
              startContent={action.icon}
              color="primary"
              variant="flat"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}