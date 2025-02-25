import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockMaterials = [
  {
    id: '1',
    title: 'Introduction to Calculus',
    description: 'A comprehensive guide to differential calculus with practice problems and solutions.',
    subject: 'Mathematics',
    grade: '12',
    uploadedBy: {
      name: 'Dr. Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
    uploadDate: '2024-03-01',
    downloads: 245,
    views: 1250,
    rating: 4.8,
    fileType: 'PDF',
    fileSize: '2.5 MB',
    progress: 75,
    isBookmarked: true,
  },
  {
    id: '2',
    title: 'Physics Lab Experiments',
    description: 'Collection of physics lab experiments for practical sessions with detailed procedures.',
    subject: 'Physics',
    grade: '11',
    uploadedBy: {
      name: 'Prof. Michael Brown',
      avatar: 'https://i.pravatar.cc/150?u=michael',
    },
    uploadDate: '2024-02-28',
    downloads: 180,
    views: 950,
    rating: 4.5,
    fileType: 'PDF',
    fileSize: '3.2 MB',
    progress: 30,
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'English Literature Analysis',
    description: 'Analysis of classic literature works with critical thinking exercises.',
    subject: 'English',
    grade: '10',
    uploadedBy: {
      name: 'Ms. Emily Davis',
      avatar: 'https://i.pravatar.cc/150?u=emily',
    },
    uploadDate: '2024-02-25',
    downloads: 156,
    views: 820,
    rating: 4.2,
    fileType: 'DOCX',
    fileSize: '1.8 MB',
    progress: 100,
    isBookmarked: true,
  },
];

const mockStats = {
  totalMaterials: 156,
  totalDownloads: 12500,
  totalViews: 45000,
  averageRating: '4.6',
};

export function useMaterials() {
  const [materials, setMaterials] = useState(mockMaterials);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchMaterials = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMaterials(mockMaterials);
        setStats(mockStats);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch materials');
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  return {
    materials,
    stats,
    isLoading,
    error,
  };
}