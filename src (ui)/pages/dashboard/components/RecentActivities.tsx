import React from 'react';
import { Card, CardBody, CardHeader, Avatar } from '@nextui-org/react';
import { Activity } from 'lucide-react';
import type { UserRole } from '../../../types/auth';

interface RecentActivitiesProps {
  role: UserRole;
}

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  time: string;
}

export function RecentActivities({ role }: RecentActivitiesProps) {
  const getActivities = (): Activity[] => {
    switch (role) {
      case 'SUPER_ADMIN':
        return [
          {
            id: '1',
            user: { name: 'ABC School' },
            action: 'renewed their annual subscription',
            time: '2 hours ago'
          },
          {
            id: '2',
            user: { name: 'XYZ Institute' },
            action: 'registered as a new institution',
            time: '4 hours ago'
          },
          {
            id: '3',
            user: { name: 'PQR Academy' },
            action: 'upgraded their subscription plan',
            time: '6 hours ago'
          }
        ];
      case 'ADMIN':
        return [
          {
            id: '1',
            user: { name: 'John Smith' },
            action: 'submitted attendance for Class 10A',
            time: '1 hour ago'
          },
          {
            id: '2',
            user: { name: 'Sarah Wilson' },
            action: 'uploaded new study materials',
            time: '3 hours ago'
          },
          {
            id: '3',
            user: { name: 'Mike Johnson' },
            action: 'created a new test for Physics',
            time: '5 hours ago'
          }
        ];
      case 'STUDENT':
        return [
          {
            id: '1',
            user: { name: 'Physics Teacher' },
            action: 'posted new assignment',
            time: '30 minutes ago'
          },
          {
            id: '2',
            user: { name: 'Math Teacher' },
            action: 'graded your test',
            time: '2 hours ago'
          },
          {
            id: '3',
            user: { name: 'Chemistry Teacher' },
            action: 'shared study materials',
            time: '4 hours ago'
          }
        ];
      default:
        return [];
    }
  };

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <Activity className="w-6 h-6" />
        <div className="flex flex-col">
          <p className="text-md font-semibold">Recent Activities</p>
          <p className="text-small text-default-500">Latest updates and actions</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {getActivities().map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar
                name={activity.user.name}
                src={activity.user.avatar}
                size="sm"
              />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{activity.user.name}</span>
                  {' '}{activity.action}
                </p>
                <p className="text-xs text-default-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}