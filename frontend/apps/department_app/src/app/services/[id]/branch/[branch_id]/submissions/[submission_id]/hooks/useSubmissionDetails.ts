'use client';

import { useState, useEffect, useCallback } from 'react';
import { SubmissionDetails, UseSubmissionDetailsReturn, SubmissionNote } from '../types/submission-details.types';

interface UseSubmissionDetailsProps {
  submissionId: string;
}

// Sample data for testing
const SAMPLE_SUBMISSION: SubmissionDetails = {
  id: '1',
  serviceId: 'service1',
  citizenName: 'John Doe',
  citizenEmail: 'john.doe@email.com',
  status: 'pending',
  formData: {
    nationalId: '123456789V',
    fullName: 'John Doe',
    address: '123 Main Street, Colombo 03',
    phoneNumber: '+94771234567',
    vehicleType: 'motorcycle',
    engineNumber: 'ENG123456',
    chassisNumber: 'CHAS789012',
    purposeOfRegistration: 'personal',
    previousOwner: 'N/A'
  },
  citizen: {
    id: 'citizen1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    isVerified: true
  },
  service: {
    id: 'service1',
    name: 'Registration of Motor Bikes',
    description: 'Register your motorcycle with the Department of Motor Traffic',
    autoAcceptAppointments: false,
    formFields: [
      {
        fieldType: 'text',
        label: 'National ID Number',
        key: 'nationalId',
        required: true,
        validation: {
          pattern: '^[0-9]{9}[vVxX]$'
        },
        placeholder: 'Enter your National ID'
      },
      {
        fieldType: 'text',
        label: 'Full Name',
        key: 'fullName',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100
        },
        placeholder: 'Enter your full name'
      },
      {
        fieldType: 'textarea',
        label: 'Address',
        key: 'address',
        required: true,
        placeholder: 'Enter your full address'
      },
      {
        fieldType: 'text',
        label: 'Phone Number',
        key: 'phoneNumber',
        required: true,
        validation: {
          pattern: '^[+]94[0-9]{9}$'
        },
        placeholder: '+94XXXXXXXXX'
      },
      {
        fieldType: 'select',
        label: 'Vehicle Type',
        key: 'vehicleType',
        required: true,
        options: [
          { label: 'Motorcycle', value: 'motorcycle' },
          { label: 'Scooter', value: 'scooter' },
          { label: 'Three Wheeler', value: 'threewheeler' }
        ]
      },
      {
        fieldType: 'text',
        label: 'Engine Number',
        key: 'engineNumber',
        required: true,
        placeholder: 'Enter engine number'
      },
      {
        fieldType: 'text',
        label: 'Chassis Number',
        key: 'chassisNumber',
        required: true,
        placeholder: 'Enter chassis number'
      },
      {
        fieldType: 'radio',
        label: 'Purpose of Registration',
        key: 'purposeOfRegistration',
        required: true,
        options: [
          { label: 'Personal Use', value: 'personal' },
          { label: 'Commercial Use', value: 'commercial' },
          { label: 'Government Use', value: 'government' }
        ]
      },
      {
        fieldType: 'text',
        label: 'Previous Owner (if applicable)',
        key: 'previousOwner',
        required: false,
        placeholder: 'Enter previous owner name or N/A'
      }
    ]
  },
  appointment: {
    date: new Date('2025-08-20'),
    startTime: '09:00',
    endTime: '09:30',
    locationId: 'loc1',
    tokenNumber: 'A001'
  },
  location: {
    id: 'loc1',
    name: 'Colombo Central',
    address: '234 Union Place, Colombo 02'
  },
  documentsCount: 3,
  notes: [
    {
      id: 'note1',
      userId: 'staff1',
      userName: 'Jane Smith',
      content: 'Initial review completed. All documents seem to be in order.',
      createdAt: new Date('2025-08-16T10:00:00Z')
    },
    {
      id: 'note2',
      userId: 'staff2',
      userName: 'Mike Johnson',
      content: 'Vehicle inspection scheduled for tomorrow.',
      createdAt: new Date('2025-08-16T14:30:00Z')
    }
  ] as SubmissionNote[],
  createdAt: new Date('2025-08-15T08:00:00Z'),
  updatedAt: new Date('2025-08-16T14:30:00Z')
};

export function useSubmissionDetails({
  submissionId
}: UseSubmissionDetailsProps): UseSubmissionDetailsReturn {
  const [submission, setSubmission] = useState<SubmissionDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissionDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching submission details for ID:', submissionId);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO
      // For now, return sample data
      // In real implementation, this would be:
      // const response = await fetch(`/api/submissions/${submissionId}`);
      // const data = await response.json();
      
      setSubmission(SAMPLE_SUBMISSION);
      
    } catch (err) {
      console.error('Error fetching submission details:', err);
      setError('Failed to load submission details. Please try again.');
      setSubmission(null);
    } finally {
      setLoading(false);
    }
  }, [submissionId]);

  const refetch = useCallback(() => {
    fetchSubmissionDetails();
  }, [fetchSubmissionDetails]);

  useEffect(() => {
    if (submissionId) {
      fetchSubmissionDetails();
    }
  }, [submissionId, fetchSubmissionDetails]);

  return {
    submission,
    loading,
    error,
    refetch,
  };
}
