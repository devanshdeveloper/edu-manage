import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Select,
  SelectItem,
  Button,
} from '@nextui-org/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Download,
  Calendar,
  Building2,
  Users,
  AlertTriangle,
} from 'lucide-react';
import { AttendanceStats } from './AttendanceStats';
import { useAttendance } from '../hooks/useAttendance';

const COLORS = ['#17C964', '#F5A524', '#F31260'];

export function SuperAdminAttendance() {
  const { stats, attendanceData, isLoading } = useAttendance();

  const pieData = [
    { name: 'Present', value: 85 },
    { name: 'Late', value: 10 },
    { name: 'Absent', value: 5 },
  ];

  return (
    <div className="space-y-6">
      <AttendanceStats stats={stats} isLoading={isLoading} />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select
          label="Time Period"
          placeholder="Select time range"
          startContent={<Calendar className="w-4 h-4 text-default-400" />}
          className="max-w-xs"
        >
          <SelectItem key="today" value="today">Today</SelectItem>
          <SelectItem key="week" value="week">This Week</SelectItem>
          <SelectItem key="month" value="month">This Month</SelectItem>
          <SelectItem key="quarter" value="quarter">This Quarter</SelectItem>
        </Select>

        <Select
          label="Institution"
          placeholder="Select institution"
          startContent={<Building2 className="w-4 h-4 text-default-400" />}
          className="max-w-xs"
        >
          <SelectItem key="all" value="all">All Institutions</SelectItem>
          <SelectItem key="1" value="1">Springfield Academy</SelectItem>
          <SelectItem key="2" value="2">Riverside School</SelectItem>
        </Select>

        <Button
          color="primary"
          variant="flat"
          startContent={<Download className="w-4 h-4" />}
          className="max-w-xs"
        >
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <Users className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Attendance Trends</p>
              <p className="text-small text-default-500">Daily attendance percentage</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#006FEE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <AlertTriangle className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Attendance Distribution</p>
              <p className="text-small text-default-500">Overall attendance status</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-small">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}