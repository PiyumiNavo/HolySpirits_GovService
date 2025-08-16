// API response types
export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data: T;
}

export interface ApiError {
  status: number;
  message: string;
  error?: string;
}

// User types
export interface VerificationDocument {
  documentType: string;
  documentNumber: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  verified: boolean;
  verifiedBy: string;
  verificationDate: string;
  documentUrl: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  verificationDocuments: VerificationDocument[];
  isVerified: boolean;
  verificationDate: string;
  verifiedBy: string;
  departmentId: string;
  assignedServices: string[];
  notificationPreferences: NotificationPreferences;
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
