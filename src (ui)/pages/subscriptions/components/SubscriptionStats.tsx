import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import {
  TrendingUp,
  Users,
  AlertTriangle,
  CreditCard,
  ArrowUpIcon,
  ArrowDownIcon,
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  description: string;
}

function StatCard({ title, value, icon, trend, description }: StatCardProps) {
  const isPositive = trend.startsWith('+');

  return (
    <Card>
      <CardBody className="flex flex-row items-center gap-4">
        <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-6 h-6 text-primary-500"
          })}
        </div>
        <div className="flex-1">
          <p className="text-small text-default-500">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-semibold">{value}</p>
            <div className="flex items-center gap-1 text-xs">
              <span className={isPositive ? "text-success" : "text-danger"}>
                {isPositive ? (
                  <ArrowUpIcon className="w-3 h-3" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3" />
                )}
              </span>
              <span className={isPositive ? "text-success" : "text-danger"}>
                {trend}
              </span>
            </div>
          </div>
          <p className="text-xs text-default-400">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
}

interface SubscriptionStatsProps {
  stats: {
    totalRevenue: string;
    activeSubscriptions: number;
    expiringSubscriptions: number;
    renewalRate: string;
  };
  isLoading: boolean;
}

export function SubscriptionStats({ stats, isLoading }: SubscriptionStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardBody>
              <div className="h-24 animate-pulse bg-default-100 rounded-lg" />
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Monthly Revenue"
        value={stats.totalRevenue}
        icon={<TrendingUp />}
        trend="+12.5%"
        description="vs last month"
      />
      <StatCard
        title="Active Subscriptions"
        value={stats.activeSubscriptions.toString()}
        icon={<Users />}
        trend="+4.3%"
        description="vs last month"
      />
      <StatCard
        title="Expiring Soon"
        value={stats.expiringSubscriptions.toString()}
        icon={<AlertTriangle />}
        trend="-2.1%"
        description="vs last month"
      />
      <StatCard
        title="Renewal Rate"
        value={stats.renewalRate}
        icon={<CreditCard />}
        trend="+1.8%"
        description="vs last month"
      />
    </div>
  );
}