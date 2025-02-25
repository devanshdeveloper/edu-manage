import React from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Avatar,
  Switch,
  Divider,
} from '@nextui-org/react';
import { User, Mail, Phone, MapPin, Upload } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export function AccountSettings() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardBody className="gap-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              src={user?.avatar}
              className="w-24 h-24"
              isBordered
              color="primary"
            />
            <Button
              color="primary"
              variant="flat"
              startContent={<Upload className="w-4 h-4" />}
            >
              Change Photo
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              defaultValue={user?.name}
              startContent={<User className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              defaultValue={user?.email}
              startContent={<Mail className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="Enter your phone number"
              startContent={<Phone className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Address"
              placeholder="Enter your address"
              startContent={<MapPin className="w-4 h-4 text-default-400" />}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
            />
            <div className="md:col-span-2 h-4" />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
            />
          </div>
          <Button color="primary" className="mt-2">
            Change Password
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Preferences</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-small text-default-500">
                  Receive email notifications about important updates
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-small text-default-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-small text-default-500">
                  Toggle between light and dark theme
                </p>
              </div>
              <Switch defaultSelected />
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