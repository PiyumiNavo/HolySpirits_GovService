export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

export type SubmissionSortField = 'status' | 'createdAt' | 'appointmentDate' | 'citizenName' | 'updatedAt';
export type SortDirection = 'asc' | 'desc';

export interface Submission {
  id: string;
  serviceId: string;
  citizenId: string;
  citizenName: string;
  citizenEmail: string;
  status: SubmissionStatus;
  formData: Record<string, any>;
  appointment?: {
    date: Date;
    startTime: string;
    endTime: string;
    locationId: string;
    tokenNumber: string;
  };
  assignedTo?: {
    id: string;
    name: string;
  };
  documentsCount: number;
  notes: Array<{
    userId: string;
    content: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubmissionFilters {
  status: SubmissionStatus[];
  submissionDateRange: {
    start: Date | null;
    end: Date | null;
  };
  appointmentDateRange: {
    start: Date | null;
    end: Date | null;
  };
  search: string;
}

export interface SubmissionStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  completed: number;
  cancelled: number;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface SubmissionsResponse {
  submissions: Submission[];
  pagination: PaginationState;
  stats: SubmissionStats;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface SubmissionQueryParams {
  page?: number;
  limit?: number;
  status?: SubmissionStatus[];
  startDate?: string;
  endDate?: string;
  appointmentStartDate?: string;
  appointmentEndDate?: string;
  search?: string;
  sortBy?: 'status' | 'createdAt' | 'appointmentDate';
  sortOrder?: 'asc' | 'desc';
}
