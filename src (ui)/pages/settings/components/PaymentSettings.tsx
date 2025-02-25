import React from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  Switch,
  Divider,
  Chip,
} from '@nextui-org/react';
import {
  CreditCard,
  DollarSign,
  Wallet,
  Receipt,
  AlertTriangle,
  Plus,
} from 'lucide-react';

const currencies = [
  { label: 'US Dollar (USD)', value: 'USD' },
  { label: 'Euro (EUR)', value: 'EUR' },
  { label: 'British Pound (GBP)', value: 'GBP' },
  { label: 'Indian Rupee (INR)', value: 'INR' },
];

export function PaymentSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Payment Gateway</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Default Gateway"
              placeholder="Select payment gateway"
              startContent={<CreditCard className="w-4 h-4 text-default-400" />}
            >
              <SelectItem key="stripe" value="stripe">Stripe</SelectItem>
              <SelectItem key="paypal" value="paypal">PayPal</SelectItem>
              <SelectItem key="razorpay" value="razorpay">Razorpay</SelectItem>
            </Select>
            <Select
              label="Default Currency"
              placeholder="Select currency"
              startContent={<DollarSign className="w-4 h-4 text-default-400" />}
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <Button
              color="primary"
              variant="flat"
              startContent={<Plus className="w-4 h-4" />}
            >
              Add Method
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Credit/Debit Cards</p>
                  <p className="text-small text-default-500">
                    Via Stripe
                  </p>
                </div>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Digital Wallets</p>
                  <p className="text-small text-default-500">
                    Google Pay, Apple Pay
                  </p>
                </div>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-small text-default-500">
                    Direct bank transfer
                  </p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Fee Structure</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardBody>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Basic</h4>
                    <Chip size="sm" color="primary">Active</Chip>
                  </div>
                  <p className="text-2xl font-bold">$99<span className="text-small font-normal">/month</span></p>
                  <Button className="mt-4" color="primary" variant="flat" fullWidth>
                    Edit Plan
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Professional</h4>
                    <Chip size="sm" color="primary">Active</Chip>
                  </div>
                  <p className="text-2xl font-bold">$199<span className="text-small font-normal">/month</span></p>
                  <Button className="mt-4" color="primary" variant="flat" fullWidth>
                    Edit Plan
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Enterprise</h4>
                    <Chip size="sm" color="primary">Active</Chip>
                  </div>
                  <p className="text-2xl font-bold">$499<span className="text-small font-normal">/month</span></p>
                  <Button className="mt-4" color="primary" variant="flat" fullWidth>
                    Edit Plan
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <h3 className="text-lg font-semibold">Payment Notifications</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Payment Confirmation</p>
                <p className="text-small text-default-500">
                  Send email notifications for successful payments
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Payment Reminders</p>
                <p className="text-small text-default-500">
                  Send reminders for upcoming payments
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Failed Payment Alerts</p>
                <p className="text-small text-default-500">
                  Send notifications for failed payments
                </p>
              </div>
              <Switch defaultSelected />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Payment Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Fraud Detection</p>
                <p className="text-small text-default-500">
                  Enable automatic fraud detection
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Payment Verification</p>
                <p className="text-small text-default-500">
                  Require CVV for card payments
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Transaction Limits</p>
                <p className="text-small text-default-500">
                  Set maximum transaction limits
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