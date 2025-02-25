import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Progress,
  Chip,
} from '@nextui-org/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  CreditCard,
  Clock,
  Receipt,
  Download,
  TrendingUp,
  AlertTriangle,
  Calendar,
} from 'lucide-react';
import { FeesStats } from './FeesStats';
import { useFees } from '../hooks/useFees';

const statusColorMap = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
  partial: "primary",
};

export function StudentFees() {
  const { stats, paymentHistory, isLoading } = useFees();

  const handleInitiatePayment = () => {
    // TODO: Implement payment initiation logic
  };

  return (
    <div className="space-y-6">
      <FeesStats stats={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <TrendingUp className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Payment History</p>
              <p className="text-small text-default-500">Your fee payment trends</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <LineChart data={paymentHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) =>
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(value)
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#006FEE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <AlertTriangle className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Current Fee Status</p>
              <p className="text-small text-default-500">Academic year 2024</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-small">Payment Progress</p>
                <p className="text-small font-semibold">75%</p>
              </div>
              <Progress
                value={75}
                color="primary"
                className="max-w-md"
                showValueLabel={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-small text-default-500">Total Fees</p>
                <p className="text-xl font-semibold">$12,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-small text-default-500">Paid Amount</p>
                <p className="text-xl font-semibold">$9,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-small text-default-500">Due Amount</p>
                <p className="text-xl font-semibold">$3,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-small text-default-500">Next Due Date</p>
                <p className="text-xl font-semibold">Mar 15</p>
              </div>
            </div>

            <Button
              color="primary"
              className="w-full"
              startContent={<CreditCard className="w-4 h-4" />}
              onPress={handleInitiatePayment}
            >
              Pay Now
            </Button>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex gap-3">
          <Receipt className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Recent Transactions</p>
            <p className="text-small text-default-500">Your payment history</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            {[
              {
                id: '1',
                date: '2024-03-01',
                amount: 1000,
                status: 'paid',
                type: 'Tuition Fee',
              },
              {
                id: '2',
                date: '2024-02-01',
                amount: 1000,
                status: 'paid',
                type: 'Tuition Fee',
              },
              {
                id: '3',
                date: '2024-01-01',
                amount: 1000,
                status: 'paid',
                type: 'Tuition Fee',
              },
            ].map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-default-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-default-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{transaction.type}</p>
                    <p className="text-small text-default-500">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">
                      ${transaction.amount.toLocaleString()}
                    </p>
                    <Chip
                      size="sm"
                      color={statusColorMap[transaction.status as keyof typeof statusColorMap]}
                    >
                      {transaction.status}
                    </Chip>
                  </div>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => {/* TODO: Download receipt */}}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}