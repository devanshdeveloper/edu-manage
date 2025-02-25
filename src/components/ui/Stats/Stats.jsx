import { Card, CardBody } from '@heroui/card';
import StatCard from './StatsCard';

export default function Stats({ stats, isLoading , length = 4 }) {
 

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(length)].map((_, i) => (
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
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          description={stat.description}
        />
      ))}
    </div>
  );

}