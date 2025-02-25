import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollShadow } from '@nextui-org/react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  Building2,
  Wallet,
  TestTube2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['SUPER_ADMIN', 'ADMIN', 'STUDENT'],
  },
  {
    label: 'Institutions',
    path: '/institutions',
    icon: <Building2 className="w-5 h-5" />,
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Subscriptions',
    path: '/subscriptions',
    icon: <Wallet className="w-5 h-5" />,
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Teachers',
    path: '/teachers',
    icon: <Users className="w-5 h-5" />,
    roles: ['ADMIN'],
  },
  {
    label: 'Students',
    path: '/students',
    icon: <GraduationCap className="w-5 h-5" />,
    roles: ['ADMIN'],
  },
  {
    label: 'Classrooms',
    path: '/classrooms',
    icon: <BookOpen className="w-5 h-5" />,
    roles: ['ADMIN'],
  },
  {
    label: 'Attendance',
    path: '/attendance',
    icon: <Calendar className="w-5 h-5" />,
    roles: ['ADMIN', "STUDENT"],
  },
  {
    label: 'Fees',
    path: '/fees',
    icon: <CreditCard className="w-5 h-5" />,
    roles: ['ADMIN', 'STUDENT'],
  },
  {
    label: 'Learning Materials',
    path: '/materials',
    icon: <FileText className="w-5 h-5" />,
    roles: ['ADMIN', 'STUDENT'],
  },
  {
    label: 'Tests',
    path: '/tests',
    icon: <TestTube2 className="w-5 h-5" />,
    roles: ['ADMIN', 'STUDENT'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <Settings className="w-5 h-5" />,
    roles: ['SUPER_ADMIN', 'ADMIN', 'STUDENT'],
  },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <aside
      className={`fixed left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <ScrollShadow className="h-full">
        <nav className="p-4 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollShadow>
    </aside>
  );
}