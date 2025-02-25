import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
} from '@nextui-org/react';
import {
  Search,
  Download,
  Calendar,
  FileText,
  MapPin,
  Settings,
  AlertTriangle,
  Clock,
  User,
  Filter,
  Save,
  FileDown,
  Shield,
  Activity,
  Database,
  Mail,
  Users,
  BookOpen,
  CreditCard,
  LogIn,
  LogOut,
  Edit3,
  Trash2,
  RefreshCw,
  Lock,
  Key,
  BarChart3,
  PieChart,
} from 'lucide-react';

// Mock data for demonstration
const mockAuditLogs = [
  {
    id: '1',
    timestamp: '2024-03-15 14:30:00',
    user: {
      name: 'John Smith',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/150?u=john',
    },
    action: 'User Login',
    module: 'Authentication',
    ipAddress: '192.168.1.1',
    location: 'San Francisco, US',
    status: 'success',
    details: 'Successful login attempt',
  },
  {
    id: '2',
    timestamp: '2024-03-15 14:25:00',
    user: {
      name: 'Emma Wilson',
      role: 'Teacher',
      avatar: 'https://i.pravatar.cc/150?u=emma',
    },
    action: 'Create Test',
    module: 'Tests',
    ipAddress: '192.168.1.2',
    location: 'New York, US',
    status: 'success',
    details: 'Created new mathematics test',
  },
  {
    id: '3',
    timestamp: '2024-03-15 14:20:00',
    user: {
      name: 'System',
      role: 'System',
      avatar: '',
    },
    action: 'Backup Created',
    module: 'System',
    ipAddress: 'internal',
    location: 'Server',
    status: 'success',
    details: 'Automated daily backup completed',
  },
  {
    id: '4',
    timestamp: '2024-03-15 14:15:00',
    user: {
      name: 'Unknown',
      role: 'Anonymous',
      avatar: '',
    },
    action: 'Failed Login',
    module: 'Authentication',
    ipAddress: '192.168.1.4',
    location: 'Beijing, CN',
    status: 'error',
    details: 'Invalid credentials provided',
  },
];

const modules = [
  { label: 'All Modules', value: 'all' },
  { label: 'Authentication', value: 'authentication', icon: Shield },
  { label: 'User Management', value: 'users', icon: Users },
  { label: 'Tests', value: 'tests', icon: BookOpen },
  { label: 'Payments', value: 'payments', icon: CreditCard },
  { label: 'System', value: 'system', icon: Settings },
];

const actions = [
  { label: 'Login', value: 'login', icon: LogIn },
  { label: 'Logout', value: 'logout', icon: LogOut },
  { label: 'Create', value: 'create', icon: Edit3 },
  { label: 'Delete', value: 'delete', icon: Trash2 },
  { label: 'Update', value: 'update', icon: RefreshCw },
  { label: 'Permission Change', value: 'permission', icon: Lock },
];

export function AuditSettings() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleExport = (format: 'csv' | 'pdf') => {
    // TODO: Implement export functionality
    console.log(`Exporting in ${format} format`);
  };

  const renderStatusChip = (status: string) => {
    const color = status === 'success' ? 'success' : 'danger';
    return (
      <Chip size="sm" color={color} variant="flat">
        {status}
      </Chip>
    );
  };

  const getModuleIcon = (moduleName: string) => {
    switch (moduleName.toLowerCase()) {
      case 'authentication':
        return <Shield className="w-4 h-4" />;
      case 'users':
        return <Users className="w-4 h-4" />;
      case 'tests':
        return <BookOpen className="w-4 h-4" />;
      case 'payments':
        return <CreditCard className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <BarChart3 className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Activity Overview</p>
              <p className="text-small text-default-500">System activity trends</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="h-[300px] flex items-center justify-center bg-default-100 rounded-lg">
              <span className="text-default-500">Activity Chart Coming Soon</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <PieChart className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Events Distribution</p>
              <p className="text-small text-default-500">By module and status</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="h-[300px] flex items-center justify-center bg-default-100 rounded-lg">
              <span className="text-default-500">Distribution Chart Coming Soon</span>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6" />
            <div>
              <p className="text-md font-semibold">Audit Log</p>
              <p className="text-small text-default-500">System activity records</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<Download className="w-4 h-4" />}
                >
                  Export
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Export options">
                <DropdownItem
                  key="csv"
                  startContent={<FileDown className="w-4 h-4" />}
                  onPress={() => handleExport('csv')}
                >
                  Export as CSV
                </DropdownItem>
                <DropdownItem
                  key="pdf"
                  startContent={<FileText className="w-4 h-4" />}
                  onPress={() => handleExport('pdf')}
                >
                  Export as PDF
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              variant="flat"
              startContent={<Settings className="w-4 h-4" />}
              onPress={onOpen}
            >
              Settings
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  isClearable
                  className="w-full sm:w-72"
                  placeholder="Search logs..."
                  startContent={<Search className="w-4 h-4 text-default-400" />}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <Select
                  className="w-full sm:w-48"
                  placeholder="Filter by module"
                  selectedKeys={[selectedModule]}
                  onChange={(e) => setSelectedModule(e.target.value)}
                >
                  {modules.map((module) => (
                    <SelectItem
                      key={module.value}
                      value={module.value}
                      startContent={
                        module.icon && <module.icon className="w-4 h-4" />
                      }
                    >
                      {module.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  className="w-full sm:w-48"
                  placeholder="Time range"
                  selectedKeys={[selectedDateRange]}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                  <SelectItem key="today" value="today">Today</SelectItem>
                  <SelectItem key="week" value="week">This Week</SelectItem>
                  <SelectItem key="month" value="month">This Month</SelectItem>
                  <SelectItem key="custom" value="custom">Custom Range</SelectItem>
                </Select>
              </div>
              <div className="flex gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      startContent={<Filter className="w-4 h-4" />}
                    >
                      More Filters
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Filter options">
                    <DropdownItem key="status">Filter by Status</DropdownItem>
                    <DropdownItem key="user">Filter by User</DropdownItem>
                    <DropdownItem key="ip">Filter by IP Address</DropdownItem>
                    <DropdownItem key="location">Filter by Location</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <Table
              aria-label="Audit log table"
              bottomContent={
                <div className="flex justify-between items-center">
                  <Pagination
                    total={Math.ceil(mockAuditLogs.length / rowsPerPage)}
                    page={page}
                    onChange={setPage}
                  />
                  <span className="text-small text-default-400">
                    Total {mockAuditLogs.length} entries
                  </span>
                </div>
              }
            >
              <TableHeader>
                <TableColumn>TIMESTAMP</TableColumn>
                <TableColumn>USER</TableColumn>
                <TableColumn>ACTION</TableColumn>
                <TableColumn>MODULE</TableColumn>
                <TableColumn>LOCATION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>DETAILS</TableColumn>
              </TableHeader>
              <TableBody items={mockAuditLogs}>
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-default-400" />
                        <span>{item.timestamp}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-default-400" />
                        <div>
                          <p>{item.user.name}</p>
                          <p className="text-small text-default-500">
                            {item.user.role}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getModuleIcon(item.module)}
                        <span>{item.module}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{item.location}</span>
                        <span className="text-small text-default-500">
                          {item.ipAddress}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{renderStatusChip(item.status)}</TableCell>
                    <TableCell>
                      <span className="text-small">{item.details}</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex gap-1">Audit Log Settings</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <Card>
                <CardBody className="gap-4">
                  <h3 className="text-lg font-semibold">Data Retention</h3>
                  <Select
                    label="Log Retention Period"
                    placeholder="Select retention period"
                  >
                    <SelectItem key="30" value="30">30 days</SelectItem>
                    <SelectItem key="60" value="60">60 days</SelectItem>
                    <SelectItem key="90" value="90">90 days</SelectItem>
                    <SelectItem key="180" value="180">180 days</SelectItem>
                    <SelectItem key="365" value="365">1 year</SelectItem>
                  </Select>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="gap-4">
                  <h3 className="text-lg font-semibold">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Critical Events Alert</p>
                        <p className="text-small text-default-500">
                          Receive email notifications for critical security events
                        </p>
                      </div>
                      <Button
                        color="primary"
                        variant="flat"
                        startContent={<Mail className="w-4 h-4" />}
                      >
                        Configure
                      </Button>
                    </div>
                    <Divider />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Daily Summary</p>
                        <p className="text-small text-default-500">
                          Receive daily audit log summary
                        </p>
                      </div>
                      <Button
                        color="primary"
                        variant="flat"
                        startContent={<Mail className="w-4 h-4" />}
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="gap-4">
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">IP Tracking</p>
                        <p className="text-small text-default-500">
                          Track IP addresses for all activities
                        </p>
                      </div>
                      <Button
                        color="primary"
                        variant="flat"
                        startContent={<Key className="w-4 h-4" />}
                      >
                        Configure
                      </Button>
                    </div>
                    <Divider />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Geolocation</p>
                        <p className="text-small text-default-500">
                          Enable location tracking for activities
                        </p>
                      </div>
                      <Button
                        color="primary"
                        variant="flat"
                        startContent={<MapPin className="w-4 h-4" />}
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-warning-50 dark:bg-warning-900/20">
                <CardBody>
                  <div className="flex items-center gap-2 text-warning">
                    <AlertTriangle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Important Notice</p>
                      <p className="text-small">
                        Changes to retention settings will affect how long audit logs are kept.
                        Make sure to export any important data before modifying these settings.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={onClose}
              startContent={<Save className="w-4 h-4" />}
            >
              Save Settings
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}