import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
  Divider,
  Progress,
} from '@nextui-org/react';
import {
  CreditCard,
  Building2,
  Calendar,
  Users,
  HardDrive,
  Shield,
  AlertTriangle,
  Download,
  FileText,
  ArrowRight,
} from 'lucide-react';

export function SubscriptionPage() {
  const subscriptionDetails = {
    plan: "Professional",
    status: "active",
    nextBilling: "2024-04-15",
    amount: "$199.00",
    studentLimit: 2000,
    currentStudents: 1250,
    storageLimit: 25,
    storageUsed: 15.5,
  };

  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-03-15",
      amount: "$199.00",
      status: "paid"
    },
    {
      id: "INV-2024-002",
      date: "2024-02-15",
      amount: "$199.00",
      status: "paid"
    },
    {
      id: "INV-2024-003",
      date: "2024-01-15",
      amount: "$199.00",
      status: "paid"
    }
  ];

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Subscription Management</h1>
        <p className="text-default-600">
          Manage your subscription, billing, and usage details
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader className="flex gap-3">
          <Building2 className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Current Plan</p>
            <p className="text-small text-default-500">Your subscription details</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{subscriptionDetails.plan} Plan</h3>
                <Chip color="success" variant="flat">Active</Chip>
              </div>
              <p className="text-default-600 mb-4">
                Next billing on {subscriptionDetails.nextBilling} • {subscriptionDetails.amount}/month
              </p>
              <div className="flex gap-2">
                <Button color="primary">
                  Upgrade Plan
                </Button>
                <Button variant="bordered" color="danger">
                  Cancel Subscription
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4 min-w-[200px]">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-small">Students</span>
                  <span className="text-small text-default-500">
                    {subscriptionDetails.currentStudents}/{subscriptionDetails.studentLimit}
                  </span>
                </div>
                <Progress
                  value={(subscriptionDetails.currentStudents / subscriptionDetails.studentLimit) * 100}
                  color="primary"
                  className="max-w-md"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-small">Storage</span>
                  <span className="text-small text-default-500">
                    {subscriptionDetails.storageUsed}GB/{subscriptionDetails.storageLimit}GB
                  </span>
                </div>
                <Progress
                  value={(subscriptionDetails.storageUsed / subscriptionDetails.storageLimit) * 100}
                  color="primary"
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader className="flex gap-3">
          <CreditCard className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Payment Method</p>
            <p className="text-small text-default-500">Manage your payment details</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-default-100">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">•••• •••• •••• 4242</p>
                  <p className="text-small text-default-500">Expires 12/25</p>
                </div>
                <Button variant="light" color="primary">
                  Edit
                </Button>
              </div>
            </Card>
            <Button variant="bordered" startContent={<CreditCard className="w-4 h-4" />}>
              Add Payment Method
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader className="flex gap-3">
          <FileText className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Billing History</p>
            <p className="text-small text-default-500">View and download past invoices</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg border border-default-200">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-default-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{invoice.id}</p>
                    <p className="text-small text-default-500">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">{invoice.amount}</p>
                  <Chip color="success" variant="flat" size="sm">
                    {invoice.status}
                  </Chip>
                  <Button
                    isIconOnly
                    variant="light"
                    startContent={<Download className="w-4 h-4" />}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Usage & Limits */}
      <Card>
        <CardHeader className="flex gap-3">
          <Shield className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Usage & Limits</p>
            <p className="text-small text-default-500">Monitor your resource usage</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Students</p>
                  <p className="text-small text-default-500">Active users</p>
                </div>
              </div>
              <Progress
                value={(subscriptionDetails.currentStudents / subscriptionDetails.studentLimit) * 100}
                color="primary"
                className="mb-2"
              />
              <div className="flex justify-between text-small">
                <span>{subscriptionDetails.currentStudents} used</span>
                <span>{subscriptionDetails.studentLimit} limit</span>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <HardDrive className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Storage</p>
                  <p className="text-small text-default-500">File storage</p>
                </div>
              </div>
              <Progress
                value={(subscriptionDetails.storageUsed / subscriptionDetails .storageLimit) * 100}
                color="primary"
                className="mb-2"
              />
              <div className="flex justify-between text-small">
                <span>{subscriptionDetails.storageUsed}GB used</span>
                <span>{subscriptionDetails.storageLimit}GB limit</span>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Billing Cycle</p>
                  <p className="text-small text-default-500">Monthly renewal</p>
                </div>
              </div>
              <p className="text-center text-xl font-bold mb-2">15</p>
              <p className="text-center text-small text-default-500">Days until next billing</p>
            </Card>
          </div>
        </CardBody>
      </Card>

      {/* Alerts Section */}
      <Card className="bg-warning-50 dark:bg-warning-900/20">
        <CardBody>
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-warning" />
            <div>
              <p className="font-semibold">Approaching Student Limit</p>
              <p className="text-small text-default-600">
                You are at 62.5% of your student limit. Consider upgrading your plan to ensure uninterrupted service.
              </p>
              <Button
                color="warning"
                variant="flat"
                size="sm"
                endContent={<ArrowRight className="w-4 h-4" />}
                className="mt-2"
              >
                View Upgrade Options
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}