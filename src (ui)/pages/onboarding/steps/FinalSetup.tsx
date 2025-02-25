import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Switch,
  Divider,
  Select,
  SelectItem,
} from '@nextui-org/react';
import {
  Bell,
  Mail,
  Calendar,
  Globe,
  Shield,
  Settings,
  CheckCircle2,
} from 'lucide-react';

interface FinalSetupProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function FinalSetup({ onNext, onBack }: FinalSetupProps) {
  const handleComplete = () => {
    onNext({
      // Settings data
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Final Settings</h2>
        <p className="text-default-500">
          Configure additional settings for your institution
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-small text-default-500">
                    Send important updates via email
                  </p>
                </div>
                <Switch defaultSelected />
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-small text-default-500">
                    Enable SMS alerts for critical updates
                  </p>
                </div>
                <Switch />
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-small text-default-500">
                    Enable browser push notifications
                  </p>
                </div>
                <Switch defaultSelected />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">Academic Calendar</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Automatic Scheduling</p>
                  <p className="text-small text-default-500">
                    Enable AI-powered class scheduling
                  </p>
                </div>
                <Switch defaultSelected />
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Holiday Calendar</p>
                  <p className="text-small text-default-500">
                    Sync with regional holiday calendar
                  </p>
                </div>
                <Switch defaultSelected />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">Security & Privacy</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-small text-default-500">
                    Require 2FA for administrative accounts
                  </p>
                </div>
                <Switch defaultSelected />
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Data Backup</p>
                  <p className="text-small text-default-500">
                    Enable daily automated backups
                  </p>
                </div>
                <Switch defaultSelected />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">Additional Settings</h3>
            </div>
            <div className="space-y-4">
              <Select
                label="Default Language"
                placeholder="Select language"
                defaultSelectedKeys={['en']}
                startContent={<Globe className="w-4 h-4 text-default-400" />}
              >
                <SelectItem key="en" value="en">English</SelectItem>
                <SelectItem key="es" value="es">Spanish</SelectItem>
                <SelectItem key="fr" value="fr">French</SelectItem>
              </Select>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-small text-default-500">
                    Enable analytics and reporting
                  </p>
                </div>
                <Switch defaultSelected />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="flat" onPress={onBack}>
          Back
        </Button>
        <Button
          color="primary"
          endContent={<CheckCircle2 className="w-4 h-4" />}
          onPress={handleComplete}
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
}