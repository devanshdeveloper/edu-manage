import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}