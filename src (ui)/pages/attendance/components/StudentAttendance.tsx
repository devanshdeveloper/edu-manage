import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Select,
  SelectItem,
  Chip,
  Progress,
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
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { AttendanceStats } from './AttendanceStats';
import { useAttendance } from '../hooks/useAttendance';

const statusColorMap = {
  present: "success",
  absent: "danger",
  late: "warning",
  excused: "default",
};

export function StudentAttendance() {
  const { stats, attendanceData, isLoading } = useAttendance();

  // Mock attendance history data
  const attendanceHistory = [
    {
      date: '2024-03-01',
      status: 'present',
      subject: 'Mathematics',
      notes: '',
    },
    {
      date: '2024-03-02',
      status: 'late',
      subject: 'Physics',
      notes: 'Arrived 10 minutes late',
    },
    {
      date: '2024-03-03',
      status: 'absent',
      subject: 'Chemistry',
      notes: 'Medical appointment',
    },
  ];

  return (
    <div className="space-y-6">
      <AttendanceStats stats={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <TrendingUp className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Attendance Trends</p>
              <p className="text-small text-default-500">Your monthly attendance pattern</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="attendance"
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
              <p className="text-md font-semibold">Attendance Summary</p>
              <p className="text-small text-default-500">Current semester statistics</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-small">Overall Attendance</p>
                <p className="text-small font-semibold">85%</p>
              </div>
              <Progress
                value={85}
                color="success"
                className="max-w-md"
                showValueLabel={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-small text-default-500">Total Classes</p>
                <p className="text-xl font-semibold">120</p>
              </div>
              <div className="space-y-1">
                <p className="text-small text-default-500">Classes Attended</p>
                <p className="text-xl font-semibold">102</p>
              </div>
              <div className="space-y-1">
                <p className="text-small text-default-500">Late Arrivals</p>
                <p className="text-xl font-semibold">8</p>
              </div>
              <div className="space-y-1">
                <p className="text-small text-default-500">Absences</p>
                <p className="text-xl font-semibold">10</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex gap-3">
          <Calendar className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Attendance History</p>
            <p className="text-small text-default-500">Detailed attendance records</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            {attendanceHistory.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-default-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-default-100 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{record.subject}</p>
                      <Chip
                        size="sm"
                        color={statusColorMap[record.status as keyof typeof statusColorMap]}
                      >
                        {record.status}
                      </Chip>
                    </div>
                    <p className="text-small text-default-500">{record.date}</p>
                    {record.notes && (
                      <p className="text-small text-default-500 mt-1">
                        Note: {record.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}