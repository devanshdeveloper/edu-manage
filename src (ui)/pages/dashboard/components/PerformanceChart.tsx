import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PerformanceChartProps {
  type: 'revenue' | 'institutions' | 'enrollment' | 'fees' | 'student';
}

export function PerformanceChart({ type }: PerformanceChartProps) {
  // Mock data - in a real application, this would come from an API
  const getData = () => {
    switch (type) {
      case 'revenue':
        return [
          { name: 'Jan', value: 35000 },
          { name: 'Feb', value: 38000 },
          { name: 'Mar', value: 42000 },
          { name: 'Apr', value: 45000 },
          { name: 'May', value: 48000 },
          { name: 'Jun', value: 52000 },
        ];
      case 'institutions':
        return [
          { name: 'Jan', value: 120 },
          { name: 'Feb', value: 128 },
          { name: 'Mar', value: 135 },
          { name: 'Apr', value: 142 },
          { name: 'May', value: 148 },
          { name: 'Jun', value: 156 },
        ];
      case 'enrollment':
        return [
          { name: 'Jan', value: 1150 },
          { name: 'Feb', value: 1180 },
          { name: 'Mar', value: 1200 },
          { name: 'Apr', value: 1220 },
          { name: 'May', value: 1235 },
          { name: 'Jun', value: 1245 },
        ];
      case 'fees':
        return [
          { name: 'Jan', value: 22000 },
          { name: 'Feb', value: 23000 },
          { name: 'Mar', value: 24000 },
          { name: 'Apr', value: 24500 },
          { name: 'May', value: 25000 },
          { name: 'Jun', value: 25480 },
        ];
      case 'student':
        return [
          { name: 'Test 1', value: 75 },
          { name: 'Test 2', value: 78 },
          { name: 'Test 3', value: 82 },
          { name: 'Test 4', value: 80 },
          { name: 'Test 5', value: 85 },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart data={getData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#006FEE"
            strokeWidth={2}
            dot={{ fill: '#006FEE' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}