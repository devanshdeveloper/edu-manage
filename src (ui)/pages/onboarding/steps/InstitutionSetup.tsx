import React from 'react';
import {
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
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
  Users,
} from 'lucide-react';

interface InstitutionSetupProps {
  onNext: (data: any) => void;
}

const timezones = [
  { label: '(GMT-08:00) Pacific Time', value: 'America/Los_Angeles' },
  { label: '(GMT-05:00) Eastern Time', value: 'America/New_York' },
  { label: '(GMT+00:00) UTC', value: 'UTC' },
  { label: '(GMT+01:00) Central European Time', value: 'Europe/Paris' },
  { label: '(GMT+05:30) Indian Standard Time', value: 'Asia/Kolkata' },
];

export function InstitutionSetup({ onNext }: InstitutionSetupProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate and collect form data
    onNext({
      // Form data
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Institution Details</h2>
        <p className="text-default-500">
          Let's start with the basic information about your institution
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Institution Name"
            placeholder="Enter institution name"
            startContent={<Building2 className="w-4 h-4 text-default-400" />}
            isRequired
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
            isRequired
          />

          <Input
            label="Phone"
            type="tel"
            placeholder="Enter contact number"
            startContent={<Phone className="w-4 h-4 text-default-400" />}
            isRequired
          />

          <div className="md:col-span-2">
            <Textarea
              label="Address"
              placeholder="Enter institution address"
              startContent={<MapPin className="w-4 h-4 text-default-400" />}
              isRequired
            />
          </div>

          <Select
            label="Time Zone"
            placeholder="Select time zone"
            startContent={<Calendar className="w-4 h-4 text-default-400" />}
            isRequired
          >
            {timezones.map((zone) => (
              <SelectItem key={zone.value} value={zone.value}>
                {zone.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="number"
            label="Estimated Students"
            placeholder="Enter estimated number of students"
            startContent={<Users className="w-4 h-4 text-default-400" />}
            isRequired
          />
        </div>

        <Divider />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Institution Logo</h3>
            <p className="text-small text-default-500 mb-4">
              Upload your institution logo. This will be displayed throughout the platform.
            </p>
            <Button
              color="primary"
              variant="flat"
              startContent={<Upload className="w-4 h-4" />}
            >
              Upload Logo
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button color="primary" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}