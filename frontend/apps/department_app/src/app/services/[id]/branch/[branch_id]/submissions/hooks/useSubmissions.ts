'use client';

import { useState, useEffect, useCallback } from 'react';
import { Submission, SubmissionFilters } from '../types/submission.types';

interface UseSubmissionsProps {
  serviceId: string;
  branchId: string;
  filters: SubmissionFilters;
  sortField?: string;
  sortDirection?: string;
  page: number;
  limit: number;
}

interface UseSubmissionsReturn {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    completed: number;
    cancelled: number;
  };
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  refetch: () => void;
}

// Sample data for testing UI
const SAMPLE_SUBMISSIONS: Submission[] = [
  {
    id: '1',
    serviceId: 'service1',
    citizenId: 'citizen1',
    citizenName: 'John Doe',
    citizenEmail: 'john.doe@email.com',
    status: 'pending',
    formData: { nationalId: '123456789V', purpose: 'Business registration' },
    appointment: {
      date: new Date('2025-08-20'),
      startTime: '09:00',
      endTime: '09:30',
      locationId: 'loc1',
      tokenNumber: 'A001'
    },
    assignedTo: {
      id: 'staff1',
      name: 'Jane Smith'
    },
    documentsCount: 3,
    notes: [
      {
        userId: 'staff1',
        content: 'Initial review completed',
        createdAt: new Date('2025-08-16T10:00:00Z')
      }
    ],
    createdAt: new Date('2025-08-15T08:00:00Z'),
    updatedAt: new Date('2025-08-16T10:00:00Z')
  },
  {
    id: '2',
    serviceId: 'service1',
    citizenId: 'citizen2',
    citizenName: 'Alice Johnson',
    citizenEmail: 'alice.johnson@email.com',
    status: 'approved',
    formData: { nationalId: '987654321V', purpose: 'License renewal' },
    appointment: {
      date: new Date('2025-08-18'),
      startTime: '14:00',
      endTime: '14:30',
      locationId: 'loc1',
      tokenNumber: 'B002'
    },
    documentsCount: 2,
    notes: [],
    createdAt: new Date('2025-08-14T09:00:00Z'),
    updatedAt: new Date('2025-08-16T11:00:00Z')
  },
  {
    id: '3',
    serviceId: 'service1',
    citizenId: 'citizen3',
    citizenName: 'Bob Wilson',
    citizenEmail: 'bob.wilson@email.com',
    status: 'completed',
    formData: { nationalId: '456789123V', purpose: 'Certificate request' },
    documentsCount: 4,
    notes: [
      {
        userId: 'staff2',
        content: 'Documents verified and approved',
        createdAt: new Date('2025-08-15T15:00:00Z')
      }
    ],
    createdAt: new Date('2025-08-13T10:00:00Z'),
    updatedAt: new Date('2025-08-15T16:00:00Z')
  },
  {
    id: '4',
    serviceId: 'service1',
    citizenId: 'citizen4',
    citizenName: 'Sarah Davis',
    citizenEmail: 'sarah.davis@email.com',
    status: 'rejected',
    formData: { nationalId: '789123456V', purpose: 'Permit application' },
    documentsCount: 1,
    notes: [
      {
        userId: 'staff1',
        content: 'Missing required documents',
        createdAt: new Date('2025-08-14T14:00:00Z')
      }
    ],
    createdAt: new Date('2025-08-12T11:00:00Z'),
    updatedAt: new Date('2025-08-14T14:00:00Z')
  },
  {
    id: '5',
    serviceId: 'service1',
    citizenId: 'citizen5',
    citizenName: 'Mike Brown',
    citizenEmail: 'mike.brown@email.com',
    status: 'cancelled',
    formData: { nationalId: '321654987V', purpose: 'License application' },
    documentsCount: 0,
    notes: [
      {
        userId: 'citizen5',
        content: 'Request cancelled by citizen',
        createdAt: new Date('2025-08-13T09:00:00Z')
      }
    ],
    createdAt: new Date('2025-08-11T16:00:00Z'),
    updatedAt: new Date('2025-08-13T09:00:00Z')
  }
];

export function useSubmissions({
  serviceId,
  branchId,
  filters,
  sortField,
  sortDirection,
  page,
  limit
}: UseSubmissionsProps): UseSubmissionsReturn {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    completed: 0,
    cancelled: 0
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
    total: 0,
    hasNext: false,
    hasPrevious: false
  });

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching submissions for:', { serviceId, branchId, page, limit, filters });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter sample data based on filters
      let filteredSubmissions = SAMPLE_SUBMISSIONS;
      
      // Apply status filter
      if (filters.status && filters.status.length > 0) {
        filteredSubmissions = filteredSubmissions.filter(submission => 
          filters.status.includes(submission.status)
        );
      }
      
      // Apply search filter
      if (filters.search && filters.search.trim()) {
        const searchLower = filters.search.toLowerCase();
        filteredSubmissions = filteredSubmissions.filter(submission =>
          submission.citizenName.toLowerCase().includes(searchLower) ||
          submission.citizenEmail.toLowerCase().includes(searchLower) ||
          submission.id.toLowerCase().includes(searchLower)
        );
      }

      // Apply date filters (simplified for sample data)
      if (filters.submissionDateRange.start || filters.submissionDateRange.end) {
        filteredSubmissions = filteredSubmissions.filter(submission => {
          const submissionDate = submission.createdAt;
          if (filters.submissionDateRange.start && submissionDate < filters.submissionDateRange.start) {
            return false;
          }
          if (filters.submissionDateRange.end && submissionDate > filters.submissionDateRange.end) {
            return false;
          }
          return true;
        });
      }

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);
      
      // Calculate stats
      const calculatedStats = {
        total: filteredSubmissions.length,
        pending: filteredSubmissions.filter(s => s.status === 'pending').length,
        approved: filteredSubmissions.filter(s => s.status === 'approved').length,
        rejected: filteredSubmissions.filter(s => s.status === 'rejected').length,
        completed: filteredSubmissions.filter(s => s.status === 'completed').length,
        cancelled: filteredSubmissions.filter(s => s.status === 'cancelled').length,
      };

      // Calculate pagination
      const totalPages = Math.ceil(filteredSubmissions.length / limit);
      const calculatedPagination = {
        page,
        totalPages,
        total: filteredSubmissions.length,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      };
      
      setSubmissions(paginatedSubmissions);
      setStats(calculatedStats);
      setPagination(calculatedPagination);
      
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError('Failed to load submissions. Please try again.');
      setSubmissions([]);
      setStats({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        completed: 0,
        cancelled: 0
      });
      setPagination({
        page: 1,
        totalPages: 0,
        total: 0,
        hasNext: false,
        hasPrevious: false
      });
    } finally {
      setLoading(false);
    }
  }, [serviceId, branchId, page, limit, filters.status, filters.search, filters.submissionDateRange.start, filters.submissionDateRange.end, sortField, sortDirection]);

  const refetch = useCallback(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Only run once when dependencies change
  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return {
    submissions,
    loading,
    error,
    stats,
    pagination,
    refetch,
  };
}