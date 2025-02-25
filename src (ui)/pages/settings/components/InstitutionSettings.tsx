import React from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Textarea,
  Select,
  SelectItem,
  Switch,
  Divider,
} from '@nextui-org/react';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Upload,
  Clock,
} from 'lucide-react';

const timeZones = [
  { label: '(GMT-08:00) Pacific Time', value: 'America/Los_Angeles' },
  { label: '(GMT-05:00) Eastern Time', value: 'America/New_York' },
  { label: '(GMT+00:00) UTC', value: 'UTC' },
  { label: '(GMT+01:00) Central European Time', value: 'Europe/Paris' },
  { label: '(GMT+05:30) Indian Standard Time', value: 'Asia/Kolkata' },
];

export function InstitutionSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Institution Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Institution Name"
              placeholder="Enter institution name"
              startContent={<Building2 className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Website"
              placeholder="Enter website URL"
              startContent={<Globe className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter contact email"
              startContent={<Mail className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="Enter contact number"
              startContent={<Phone className="w-4 h-4 text-default-400" />}
            />
            <div className="md:col-span-2">
              <Textarea
                label="Address"
                placeholder="Enter institution address"
                startContent={<MapPin className="w-4 h-4 text-default-400" />}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-small font-medium mb-2">Logo</p>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-default-100 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-default-400" />
                </div>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Upload className="w-4 h-4" />}
                >
                  Upload Logo
                </Button>
              </div>
            </div>
            <div>
              <p className="text-small font-medium mb-2">Favicon</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-default-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-default-400" />
                </div>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Upload className="w-4 h-4" />}
                >
                  Upload Favicon
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Academic Calendar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Academic Year Start"
              type="date"
              startContent={<Calendar className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Academic Year End"
              type="date"
              startContent={<Calendar className="w-4 h-4 text-default-400" />}
            />
            <Select
              label="Time Zone"
              placeholder="Select time zone"
              startContent={<Clock className="w-4 h-4 text-default-400" />}
            >
              {timeZones.map((zone) => (
                <SelectItem key={zone.value} value={zone.value}>
                  {zone.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Features</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Online Admissions</p>
                <p className="text-small text-default-500">
                  Enable online admission applications
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Online Fee Payment</p>
                <p className="text-small text-default-500">
                  Allow students to pay fees online
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-small text-default-500">
                  Send SMS alerts for important updates
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