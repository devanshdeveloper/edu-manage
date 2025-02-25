import React from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Switch,
  Divider,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';
import {
  Mail,
  MessageSquare,
  Bell,
  Send,
  Phone,
  Smartphone,
  Globe,
  Settings,
} from 'lucide-react';

export function CommunicationSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Email Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Sender Name"
              placeholder="Enter sender name"
              startContent={<Mail className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Reply-to Email"
              placeholder="Enter reply-to email"
              type="email"
              startContent={<Mail className="w-4 h-4 text-default-400" />}
            />
            <div className="md:col-span-2">
              <Textarea
                label="Email Signature"
                placeholder="Enter email signature"
                minRows={3}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">SMS Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Enable SMS Notifications</p>
                <p className="text-small text-default-500">
                  Send important updates via SMS
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <Select
              label="SMS Provider"
              placeholder="Select SMS provider"
              startContent={<Phone className="w-4 h-4 text-default-400" />}
            >
              <SelectItem key="twilio" value="twilio">Twilio</SelectItem>
              <SelectItem key="messagebird" value="messagebird">MessageBird</SelectItem>
              <SelectItem key="vonage" value="vonage">Vonage</SelectItem>
            </Select>
            <Input
              label="API Key"
              placeholder="Enter API key"
              type="password"
              startContent={<Settings className="w-4 h-4 text-default-400" />}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Push Notifications</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Enable Push Notifications</p>
                <p className="text-small text-default-500">
                  Send notifications to mobile devices
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Sound Notifications</p>
                <p className="text-small text-default-500">
                  Play sound for important alerts
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Message Templates</h3>
          <div className="space-y-4">
            <Select
              label="Template Type"
              placeholder="Select template type"
              startContent={<MessageSquare className="w-4 h-4 text-default-400" />}
            >
              <SelectItem key="welcome" value="welcome">Welcome Message</SelectItem>
              <SelectItem key="reminder" value="reminder">Reminder</SelectItem>
              <SelectItem key="announcement" value="announcement">Announcement</SelectItem>
              <SelectItem key="alert" value="alert">Alert</SelectItem>
            </Select>
            <Textarea
              label="Template Content"
              placeholder="Enter message template"
              minRows={4}
            />
            <div className="flex gap-2">
              <Button
                variant="flat"
                startContent={<Globe className="w-4 h-4" />}
              >
                Add Translation
              </Button>
              <Button
                color="primary"
                startContent={<Send className="w-4 h-4" />}
              >
                Test Template
              </Button>
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