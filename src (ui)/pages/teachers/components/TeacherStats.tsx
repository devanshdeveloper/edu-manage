import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import {
  Users,
  UserCheck,
  Clock,
  BookOpen,
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

interface TeacherStatsProps {
  stats: {
    totalTeachers: number;
    activeTeachers: number;
    averageExperience: string;
    subjectsCovered: number;
  };
  isLoading: boolean;
}

export function TeacherStats({ stats, isLoading }: TeacherStatsProps) {
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
        title="Total Teachers"
        value={stats.totalTeachers.toString()}
        icon={<Users />}
        trend="+5.2%"
        description="vs last month"
      />
      <StatCard
        title="Active Teachers"
        value={stats.activeTeachers.toString()}
        icon={<UserCheck />}
        trend="+3.1%"
        description="vs last month"
      />
      <StatCard
        title="Average Experience"
        value={stats.averageExperience}
        icon={<Clock />}
        trend="+0.5"
        description="years vs last year"
      />
      <StatCard
        title="Subjects Covered"
        value={stats.subjectsCovered.toString()}
        icon={<BookOpen />}
        trend="+2"
        description="new subjects added"
      />
    </div>
  );
}