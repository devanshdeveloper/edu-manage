import React from "react";
import { Button } from "@heroui/button";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Menu, LogOut, Settings, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { PRODUCT_NAME } from "../constants/env";
import { Logo } from "../components/Logo";
export default function AppNavbar({ onMenuClick }) {
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
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <h1 className="text-xl font-bold">{PRODUCT_NAME}</h1>
          </div>
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
