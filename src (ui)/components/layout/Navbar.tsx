import React from 'react';

import { School } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: "bg-background/80 backdrop-blur-lg",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-lg">
              <School className="w-6 h-6 text-white" />
            </div>
            <p className="font-bold text-inherit">EduManage</p>
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path} isActive={location.pathname === item.path}>
            <Link
              as={RouterLink}
              to={item.path}
              color={location.pathname === item.path ? "primary" : "foreground"}
              className="hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={RouterLink}
            to="/login"
            variant="flat"
            color="primary"
          >
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              as={RouterLink}
              to={item.path}
              color={location.pathname === item.path ? "primary" : "foreground"}
              size="lg"
              className="w-full"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}