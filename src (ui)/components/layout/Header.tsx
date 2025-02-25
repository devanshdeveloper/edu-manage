import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Menu, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <Navbar maxWidth="full" className="h-16">
      <NavbarContent justify="start">
        <Button
          isIconOnly
          variant="light"
          className="text-gray-700 dark:text-gray-300"
          onPress={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <NavbarBrand>
          <h1 className="text-xl font-bold">Institute Management</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              name={user?.name}
              src={user?.avatar}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions">
            <DropdownItem
              key="profile"
              startContent={<UserIcon className="w-4 h-4" />}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              key="settings"
              startContent={<Settings className="w-4 h-4" />}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              startContent={<LogOut className="w-4 h-4" />}
              onPress={logout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}