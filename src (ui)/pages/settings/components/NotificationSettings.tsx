import React from 'react';
import {
  Card,
  CardBody,
  Switch,
  Divider,
  Select,
  SelectItem,
  Button,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  Settings,
  AlertTriangle,
  Calendar,
  GraduationCap,
  FileText,
  CreditCard,
  Send,
} from 'lucide-react';

export function NotificationSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedChannel, setSelectedChannel] = React.useState<string>('email');

  const notificationGroups = [
    {
      title: 'Academic Updates',
      icon: <GraduationCap className="w-5 h-5" />,
      settings: [
        { key: 'test_scores', label: 'Test Scores', defaultEnabled: true },
        { key: 'assignments', label: 'Assignment Updates', defaultEnabled: true },
        { key: 'attendance', label: 'Attendance Alerts', defaultEnabled: true },
      ],
    },
    {
      title: 'Administrative',
      icon: <FileText className="w-5 h-5" />,
      settings: [
        { key: 'announcements', label: 'School Announcements', defaultEnabled: true },
        { key: 'schedule_changes', label: 'Schedule Changes', defaultEnabled: true },
        { key: 'maintenance', label: 'System Maintenance', defaultEnabled: false },
      ],
    },
    {
      title: 'Financial',
      icon: <CreditCard className="w-5 h-5" />,
      settings: [
        { key: 'payment_due', label: 'Payment Due Reminders', defaultEnabled: true },
        { key: 'payment_received', label: 'Payment Confirmations', defaultEnabled: true },
        { key: 'invoice_generated', label: 'New Invoices', defaultEnabled: true },
      ],
    },
  ];

  const channels = [
    { key: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { key: 'sms', label: 'SMS', icon: <Smartphone className="w-4 h-4" /> },
    { key: 'push', label: 'Push Notifications', icon: <Bell className="w-4 h-4" /> },
    { key: 'in_app', label: 'In-App Notifications', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const frequencies = [
    { label: 'Immediately', value: 'immediate' },
    { label: 'Hourly Digest', value: 'hourly' },
    { label: 'Daily Summary', value: 'daily' },
    { label: 'Weekly Digest', value: 'weekly' },
  ];

  const handleTestNotification = () => {
    // TODO: Implement test notification
    onOpen();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Notification Channels</h3>
          </div>
          <div className="space-y-4">
            {channels.map((channel) => (
              <div key={channel.key} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-default-100 flex items-center justify-center">
                    {channel.icon}
                  </div>
                  <div>
                    <p className="font-medium">{channel.label}</p>
                    <p className="text-small text-default-500">
                      Receive notifications via {channel.label.toLowerCase()}
                    </p>
                  </div>
                </div>
                <Switch
                  defaultSelected={channel.key === 'email' || channel.key === 'in_app'}
                  aria-label={`Enable ${channel.label}`}
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {notificationGroups.map((group) => (
        <Card key={group.title}>
          <CardBody className="gap-4">
            <div className="flex items-center gap-2">
              {group.icon}
              <h3 className="text-lg font-semibold">{group.title}</h3>
            </div>
            <div className="space-y-4">
              {group.settings.map((setting) => (
                <div key={setting.key} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <div className="flex gap-1 mt-1">
                      {channels.map((channel) => (
                        <Chip
                          key={channel.key}
                          size="sm"
                          variant="flat"
                          startContent={channel.icon}
                        >
                          {channel.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <Switch
                    defaultSelected={setting.defaultEnabled}
                    aria-label={`Enable ${setting.label}`}
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}

      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold">Notification Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Notification Frequency</p>
                <p className="text-small text-default-500">
                  How often would you like to receive notifications?
                </p>
              </div>
              <Select
                className="max-w-xs"
                defaultSelectedKeys={['immediate']}
                startContent={<Clock className="w-4 h-4 text-default-400" />}
              >
                {frequencies.map((freq) => (
                  <SelectItem key={freq.value} value={freq.value}>
                    {freq.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Quiet Hours</p>
                <p className="text-small text-default-500">
                  Don't send notifications during these hours
                </p>
              </div>
              <Switch aria-label="Enable quiet hours" />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Important Alerts</p>
                <p className="text-small text-default-500">
                  Always notify about critical updates
                </p>
              </div>
              <Switch defaultSelected aria-label="Enable important alerts" />
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          variant="flat"
          startContent={<Send className="w-4 h-4" />}
          onPress={handleTestNotification}
        >
          Test Notifications
        </Button>
        <Button color="primary">Save Preferences</Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex gap-1">Test Notification</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="rounded-full bg-success/10 p-4">
                <Bell className="w-8 h-8 text-success" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">Test Notification Sent!</p>
                <p className="text-sm text-default-500 mt-1">
                  You should receive a test notification shortly through your enabled channels.
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}