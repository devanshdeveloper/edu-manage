import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockStats = {
  totalCollected: '$48,259',
  collectionRate: '92%',
  pendingAmount: '$4,500',
  overdueAmount: '$1,200',
};

const mockRevenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const mockPaymentHistory = [
  { month: 'Jan', amount: 1000 },
  { month: 'Feb', amount: 1000 },
  { month: 'Mar', amount: 1000 },
  { month: 'Apr', amount: 1000 },
  { month: 'May', amount: 1000 },
  { month: 'Jun', amount: 1000 },
];

export function useFees() {
  const [stats, setStats] = useState(mockStats);
  const [revenueData, setRevenueData] = useState(mockRevenueData);
  const [paymentHistory, setPaymentHistory] = useState(mockPaymentHistory);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchFeesData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
        setRevenueData(mockRevenueData);
        setPaymentHistory(mockPaymentHistory);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch fees data');
        setIsLoading(false);
      }
    };

    fetchFeesData();
  }, []);

  return {
    stats,
    revenueData,
    paymentHistory,
    isLoading,
    error,
  };
}