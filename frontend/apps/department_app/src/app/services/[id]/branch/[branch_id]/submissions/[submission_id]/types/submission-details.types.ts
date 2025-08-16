// Import base types from submissions
import { Submission, SubmissionStatus } from '../../types/submission.types';

// Extended submission with populated references
export interface SubmissionDetails extends Omit<Submission, 'citizenId' | 'assignedTo'> {
  citizen: {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
  };
  assignedTo?: {
    id: string;
    name: string;
    email: string;
  };
  service: {
    id: string;
    name: string;
    description: string;
    formFields: FormField[];
    autoAcceptAppointments: boolean;
  };
  location?: {
    id: string;
    name: string;
    address: string;
  };
  notes: SubmissionNote[];
  documentsCount: number;
}

// Form field definition from service schema
export interface FormField {
  fieldType: 'text' | 'number' | 'date' | 'time' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'file';
  label: string;
  key: string;
  required: boolean;
  options?: Array<{
    label: string;
    value: string;
  }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minValue?: number;
    maxValue?: number;
  };
  placeholder?: string;
}

// Action types for approval/rejection
export interface SubmissionAction {
  type: 'approve' | 'reject';
  reason?: string; // Required for rejection
  notes?: string; // Optional additional notes
}

// Note interface
export interface SubmissionNote {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

// Document interface
export interface SubmissionDocument {
  name: string;
  url: string;
  uploadedAt: Date;
}

// Hook return types
export interface UseSubmissionDetailsReturn {
  submission: SubmissionDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseSubmissionActionsReturn {
  approveSubmission: (notes?: string) => Promise<void>;
  rejectSubmission: (reason: string, notes?: string) => Promise<void>;
  addNote: (content: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}
