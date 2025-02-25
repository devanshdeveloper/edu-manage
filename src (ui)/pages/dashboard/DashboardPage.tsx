import React from 'react';
import { Card, CardBody, CardHeader, Divider, Progress, Chip } from '@nextui-org/react';
import {
  BarChart3,
  Users,
  GraduationCap,
  CreditCard,
  Calendar,
  TrendingUp,
  Building2,
  Wallet,
  BookOpen,
  TestTube2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from './components/StatCard';
import { RecentActivities } from './components/RecentActivities';
import { PerformanceChart } from './components/PerformanceChart';
import { QuickActions } from './components/QuickActions';

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const renderSuperAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Institutions"
          value="156"
          icon={<Building2 />}
          trend="+12%"
          description="vs last month"
        />
        <StatCard
          title="Active Subscriptions"
          value="1,284"
          icon={<Wallet />}
          trend="+8%"
          description="vs last month"
        />
        <StatCard
          title="Monthly Revenue"
          value="$48,259"
          icon={<TrendingUp />}
          trend="+15%"
          description="vs last month"
        />
        <StatCard
          title="Total Users"
          value="15,849"
          icon={<Users />}
          trend="+10%"
          description="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <BarChart3 className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Revenue Overview</p>
              <p className="text-small text-default-500">Monthly subscription revenue</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <PerformanceChart type="revenue" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <Building2 className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Institution Growth</p>
              <p className="text-small text-default-500">New institutions over time</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <PerformanceChart type="institutions" />
          </CardBody>
        </Card>
      </div>

      <QuickActions role="SUPER_ADMIN" />
      <RecentActivities role="SUPER_ADMIN" />
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value="1,245"
          icon={<GraduationCap />}
          trend="+5%"
          description="vs last month"
        />
        <StatCard
          title="Total Teachers"
          value="48"
          icon={<Users />}
          trend="+2"
          description="new this month"
        />
        <StatCard
          title="Fee Collection"
          value="$25,480"
          icon={<CreditCard />}
          trend="+12%"
          description="vs last month"
        />
        <StatCard
          title="Attendance Rate"
          value="92%"
          icon={<Calendar />}
          trend="+3%"
          description="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <Users className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Student Enrollment</p>
              <p className="text-small text-default-500">Monthly enrollment trends</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <PerformanceChart type="enrollment" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <CreditCard className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Fee Collection</p>
              <p className="text-small text-default-500">Monthly collection status</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <PerformanceChart type="fees" />
          </CardBody>
        </Card>
      </div>

      <QuickActions role="ADMIN" />
      <RecentActivities role="ADMIN" />
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance"
          value="95%"
          icon={<Calendar />}
          trend="+2%"
          description="vs last month"
        />
        <StatCard
          title="Assignments"
          value="8/10"
          icon={<BookOpen />}
          trend="2"
          description="pending"
        />
        <StatCard
          title="Test Score"
          value="85%"
          icon={<TestTube2 />}
          trend="+5%"
          description="vs last test"
        />
        <StatCard
          title="Fee Status"
          value="Paid"
          icon={<CreditCard />}
          trend="On time"
          description="Last payment"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <TestTube2 className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Performance Overview</p>
              <p className="text-small text-default-500">Test scores and assignments</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <PerformanceChart type="student" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <Calendar className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Upcoming Schedule</p>
              <p className="text-small text-default-500">Tests and assignments</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathematics Test</p>
                  <p className="text-small text-default-500">Chapter 5: Calculus</p>
                </div>
                <Chip color="warning">Tomorrow</Chip>
              </div>
              <Progress
                size="sm"
                value={80}
                color="warning"
                className="max-w-md"
              />
            </div>
            <Divider />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Physics Assignment</p>
                  <p className="text-small text-default-500">Wave Motion</p>
                </div>
                <Chip color="danger">Due in 2 days</Chip>
              </div>
              <Progress
                size="sm"
                value={60}
                color="danger"
                className="max-w-md"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <QuickActions role="STUDENT" />
      <RecentActivities role="STUDENT" />
    </div>
  );

  const renderDashboard = () => {
    switch (user.role) {
      case 'SUPER_ADMIN':
        return renderSuperAdminDashboard();
      case 'ADMIN':
        return renderAdminDashboard();
      case 'STUDENT':
        return renderStudentDashboard();
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {renderDashboard()}
    </div>
  );
}