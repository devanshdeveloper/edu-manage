import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollShadow } from "@heroui/scroll-shadow";

import { useAuth } from "../context/AuthContext";
import SidebarItems from "../constants/SidebarItems";

export default function AppSidebar({ isOpen }) {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside
      className="fixed left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300"
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
      }}
    >
      <ScrollShadow className="h-full">
        <nav className="p-4 space-y-1">
          {SidebarItems({ user }).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
