import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockInstitutions = [
  {
    id: '1',
    name: 'Springfield Academy',
    status: 'active',
    plan: 'Professional',
    features: 20,
    totalUsers: 150,
    renewalDate: '2024-04-15',
    email: 'admin@springfield.edu',
    phone: '+1 (555) 123-4567',
    location: 'Springfield, IL',
  },
  {
    id: '2',
    name: 'Riverside School',
    status: 'trial',
    plan: 'Basic',
    features: 10,
    totalUsers: 75,
    renewalDate: '2024-03-30',
    email: 'info@riverside.edu',
    phone: '+1 (555) 987-6543',
    location: 'Riverside, CA',
  },
  {
    id: '3',
    name: 'Tech Institute',
    status: 'expired',
    plan: 'Enterprise',
    features: 'Unlimited',
    totalUsers: 500,
    renewalDate: '2024-02-28',
    email: 'admin@techinstitute.edu',
    phone: '+1 (555) 456-7890',
    location: 'Silicon Valley, CA',
  },
];

export function useInstitutions() {
  const [institutions, setInstitutions] = useState(mockInstitutions);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchInstitutions = async () => {
      try {
        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setInstitutions(mockInstitutions);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch institutions');
        setIsLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  const deleteInstitution = async (id: string) => {
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInstitutions(prev => prev.filter(inst => inst.id !== id));
    } catch (err) {
      setError('Failed to delete institution');
    }
  };

  return {
    institutions,
    isLoading,
    error,
    totalInstitutions: institutions.length,
    deleteInstitution,
  };
}