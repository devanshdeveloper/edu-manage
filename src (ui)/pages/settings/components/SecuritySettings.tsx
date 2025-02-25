import React from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Switch,
  Divider,
  Progress,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from '@nextui-org/react';
import {
  Shield,
  Key,
  Smartphone,
  LogOut,
  AlertTriangle,
  Clock,
  MapPin,
  Monitor,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  XCircle,
} from 'lucide-react';

export function SecuritySettings() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showBackupCodes, setShowBackupCodes] = React.useState(false);

  // Mock data for active sessions
  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on MacBook Pro',
      location: 'San Francisco, US',
      ip: '192.168.1.1',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone 12',
      location: 'New York, US',
      ip: '192.168.1.2',
      lastActive: '1 hour ago',
      current: false,
    },
    {
      id: '3',
      device: 'Firefox on Windows PC',
      location: 'London, UK',
      ip: '192.168.1.3',
      lastActive: '2 days ago',
      current: false,
    },
  ];

  // Mock data for security logs
  const securityLogs = [
    {
      id: '1',
      event: 'Password changed',
      ip: '192.168.1.1',
      location: 'San Francisco, US',
      timestamp: '2024-03-10 14:30:00',
      status: 'success',
    },
    {
      id: '2',
      event: 'Failed login attempt',
      ip: '192.168.1.4',
      location: 'Beijing, CN',
      timestamp: '2024-03-09 08:15:00',
      status: 'error',
    },
    {
      id: '3',
      event: '2FA enabled',
      ip: '192.168.1.1',
      location: 'San Francisco, US',
      timestamp: '2024-03-08 16:45:00',
      status: 'success',
    },
  ];

  const backupCodes = [
    '1234-5678-9012',
    '2345-6789-0123',
    '3456-7890-1234',
    '4567-8901-2345',
    '5678-9012-3456',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-danger" />
            <h3 className="text-lg font-semibold">Password</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Current Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                endContent={
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                }
              />
              <div className="h-4" />
              <Input
                label="New Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
              />
              <Input
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
              />
            </div>
            <div>
              <p className="text-small font-medium mb-2">Password Strength</p>
              <Progress
                value={80}
                color="success"
                className="max-w-md"
                size="sm"
              />
              <p className="text-small text-default-500 mt-1">
                Use 8+ characters with a mix of letters, numbers & symbols
              </p>
            </div>
            <Button color="primary">
              Change Password
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-small text-default-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="space-y-2">
              <p className="font-medium">Backup Codes</p>
              <p className="text-small text-default-500">
                Save these codes in a safe place to use when you don't have access to your phone
              </p>
              <div className="grid grid-cols-2 gap-2 max-w-md mt-2">
                {backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className={`p-2 bg-default-100 rounded-lg text-center font-mono text-sm ${
                      showBackupCodes ? '' : 'blur-sm'
                    }`}
                  >
                    {code}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="flat"
                  onPress={() => setShowBackupCodes(!showBackupCodes)}
                  startContent={showBackupCodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                >
                  {showBackupCodes ? 'Hide' : 'Show'} Codes
                </Button>
                <Button
                  variant="flat"
                  startContent={<RefreshCw className="w-4 h-4" />}
                >
                  Generate New Codes
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold">Active Sessions</h3>
          </div>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 rounded-lg border border-default-200"
              >
                <div className="flex items-center gap-4">
                  <Monitor className="w-5 h-5 text-default-500" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.current && (
                        <Chip size="sm" color="primary">Current</Chip>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-small text-default-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{session.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{session.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    color="danger"
                    variant="light"
                    startContent={<LogOut className="w-4 h-4" />}
                  >
                    Logout
                  </Button>
                )}
              </div>
            ))}
            <Button
              color="danger"
              variant="flat"
              startContent={<LogOut className="w-4 h-4" />}
            >
              Logout All Other Sessions
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-danger" />
            <h3 className="text-lg font-semibold">Security Log</h3>
          </div>
          <Table aria-label="Security activity log">
            <TableHeader>
              <TableColumn>EVENT</TableColumn>
              <TableColumn>IP ADDRESS</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>TIMESTAMP</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              {securityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.event}</TableCell>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>
                    <Chip
                      color={log.status === 'success' ? 'success' : 'danger'}
                      size="sm"
                      variant="flat"
                    >
                      {log.status}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-danger" />
            <h3 className="text-lg font-semibold">Advanced Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Login Notifications</p>
                <p className="text-small text-default-500">
                  Get notified when someone logs into your account
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Suspicious Activity Detection</p>
                <p className="text-small text-default-500">
                  Automatically detect and block suspicious login attempts
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Password Reset Protection</p>
                <p className="text-small text-default-500">
                  Require additional verification for password resets
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="flat">Cancel</Button>
        <Button color="primary">Save Changes</Button>
      </div>
    </div>
  );
}