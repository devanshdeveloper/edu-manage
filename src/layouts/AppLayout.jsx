import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppNavbar from "../layout-components/AppNavbar";
import AppSidebar from "../layout-components/AppSidebar";
import { useState } from "react";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex h-[calc(100vh-4rem)] overflow-y-scroll scrollbar-hide">
        <AppSidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
        >
          <Outlet />
          <div className="h-20"></div>
        </main>
      </div>
    </div>
  );
}
