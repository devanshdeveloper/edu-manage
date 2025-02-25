import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockSubscriptions = [
  {
    id: '1',
    institution: 'Springfield Academy',
    email: 'admin@springfield.edu',
    plan: 'Professional',
    status: 'active',
    price: '$199',
    nextPayment: '2024-04-15',
  },
  {
    id: '2',
    institution: 'Riverside School',
    email: 'info@riverside.edu',
    plan: 'Basic',
    status: 'expiring',
    price: '$99',
    nextPayment: '2024-03-30',
  },
  {
    id: '3',
    institution: 'Tech Institute',
    email: 'admin@techinstitute.edu',
    plan: 'Enterprise',
    status: 'active',
    price: '$499',
    nextPayment: '2024-05-15',
  },
];

const mockStats = {
  totalRevenue: '$48,259',
  activeSubscriptions: 156,
  expiringSubscriptions: 8,
  renewalRate: '94%',
};

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchSubscriptions = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubscriptions(mockSubscriptions);
        setStats(mockStats);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch subscriptions');
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return {
    subscriptions,
    stats,
    isLoading,
    error,
  };
}