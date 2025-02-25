import React from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  Textarea,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import {
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  Shield,
  AlertTriangle,
  MoreVertical,
  Save,
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
}

export function RolesSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Mock data for demonstration
  const permissions: Permission[] = [
    {
      id: 'manage_users',
      name: 'Manage Users',
      description: 'Create, edit, and delete user accounts',
      category: 'User Management',
    },
    {
      id: 'manage_roles',
      name: 'Manage Roles',
      description: 'Create and modify user roles',
      category: 'User Management',
    },
    {
      id: 'view_reports',
      name: 'View Reports',
      description: 'Access and download system reports',
      category: 'Reporting',
    },
    {
      id: 'manage_tests',
      name: 'Manage Tests',
      description: 'Create, edit, and delete tests',
      category: 'Academic',
    },
    {
      id: 'manage_attendance',
      name: 'Manage Attendance',
      description: 'Record and modify attendance',
      category: 'Academic',
    },
    {
      id: 'manage_fees',
      name: 'Manage Fees',
      description: 'Handle fee transactions and invoices',
      category: 'Financial',
    },
  ];

  const roles: Role[] = [
    {
      id: '1',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: ['manage_users', 'manage_roles', 'view_reports', 'manage_tests', 'manage_attendance', 'manage_fees'],
      usersCount: 5,
    },
    {
      id: '2',
      name: 'Teacher',
      description: 'Access to academic features and student management',
      permissions: ['manage_tests', 'manage_attendance', 'view_reports'],
      usersCount: 25,
    },
    {
      id: '3',
      name: 'Finance Officer',
      description: 'Access to financial features and reports',
      permissions: ['manage_fees', 'view_reports'],
      usersCount: 3,
    },
  ];

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    onOpen();
  };

  const handleDelete = (roleId: string) => {
    // TODO: Implement role deletion
  };

  const handleSave = () => {
    // TODO: Implement role saving
    onClose();
  };

  const renderCell = (role: Role, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div>
            <p className="font-semibold">{role.name}</p>
            <p className="text-small text-default-500">{role.description}</p>
          </div>
        );
      case "permissions":
        return (
          <div className="flex flex-wrap gap-1">
            {role.permissions.map((permId) => {
              const permission = permissions.find(p => p.id === permId);
              return (
                <Chip
                  key={permId}
                  size="sm"
                  variant="flat"
                >
                  {permission?.name}
                </Chip>
              );
            })}
          </div>
        );
      case "users":
        return (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-default-500" />
            <span>{role.usersCount} users</span>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2 justify-end">
            <Tooltip content="Edit Role">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => handleEdit(role)}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Role actions">
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Trash2 className="w-4 h-4" />}
                  description="This action cannot be undone"
                  onPress={() => handleDelete(role.id)}
                >
                  Delete Role
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardBody className="gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">User Roles</h3>
            </div>
            <Button
              color="primary"
              endContent={<Plus className="w-4 h-4" />}
              onPress={() => {
                setSelectedRole(null);
                onOpen();
              }}
            >
              Create Role
            </Button>
          </div>

          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search roles..."
            startContent={<Search className="w-4 h-4 text-default-400" />}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />

          <Table aria-label="Roles table">
            <TableHeader>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>PERMISSIONS</TableColumn>
              <TableColumn>USERS</TableColumn>
              <TableColumn align="center">ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(role, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex gap-1">
            {selectedRole ? 'Edit Role' : 'Create New Role'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Role Name"
                  placeholder="Enter role name"
                  defaultValue={selectedRole?.name}
                />
                <Textarea
                  label="Description"
                  placeholder="Enter role description"
                  defaultValue={selectedRole?.description}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-medium font-semibold">Permissions</h4>
                {Object.entries(
                  permissions.reduce((acc, perm) => ({
                    ...acc,
                    [perm.category]: [
                      ...(acc[perm.category] || []),
                      perm,
                    ],
                  }), {} as Record<string, Permission[]>)
                ).map(([category, perms]) => (
                  <Card key={category}>
                    <CardBody>
                      <h5 className="font-medium mb-3">{category}</h5>
                      <div className="space-y-3">
                        {perms.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-start gap-2"
                          >
                            <Checkbox
                              defaultSelected={selectedRole?.permissions.includes(permission.id)}
                            >
                              <div>
                                <p className="font-medium">{permission.name}</p>
                                <p className="text-small text-default-500">
                                  {permission.description}
                                </p>
                              </div>
                            </Checkbox>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {selectedRole && (
                <Card className="bg-warning-50 dark:bg-warning-900/20">
                  <CardBody>
                    <div className="flex items-center gap-2 text-warning">
                      <AlertTriangle className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Warning</p>
                        <p className="text-small">
                          Changes to this role will affect {selectedRole.usersCount} users.
                          Make sure you understand the implications before saving.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSave}
              startContent={<Save className="w-4 h-4" />}
            >
              {selectedRole ? 'Save Changes' : 'Create Role'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}