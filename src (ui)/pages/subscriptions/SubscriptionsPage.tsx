import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { TrendingUp, Users, CreditCard, AlertTriangle } from 'lucide-react';
import { SubscriptionStats } from './components/SubscriptionStats';
import { SubscriptionsList } from './components/SubscriptionsList';
import { RevenueChart } from './components/RevenueChart';
import { PlanDistribution } from './components/PlanDistribution';
import { useSubscriptions } from './hooks/useSubscriptions';

export function SubscriptionsPage() {
  const {
    subscriptions,
    isLoading,
    error,
    stats,
  } = useSubscriptions();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-default-500">
            Manage subscription plans and monitor revenue
          </p>
        </div>
      </div>

      <SubscriptionStats stats={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <TrendingUp className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Revenue Overview</p>
              <p className="text-small text-default-500">Monthly subscription revenue</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <RevenueChart />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <CreditCard className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Plan Distribution</p>
              <p className="text-small text-default-500">Active subscriptions by plan</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <PlanDistribution />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs aria-label="Subscription categories">
            <Tab
              key="all"
              title={
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>All Subscriptions</span>
                </div>
              }
            />
            <Tab
              key="expiring"
              title={
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Expiring Soon</span>
                </div>
              }
            />
          </Tabs>
        </CardHeader>
        <Divider />
        <CardBody>
          <SubscriptionsList
            subscriptions={subscriptions}
            isLoading={isLoading}
            error={error}
          />
        </CardBody>
      </Card>
    </div>
  );
}