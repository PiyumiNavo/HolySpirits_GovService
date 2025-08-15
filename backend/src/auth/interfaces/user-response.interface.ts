import { UserRole } from '../../users/schemas/user.schema';
import { Types } from 'mongoose';

// This represents the user data after excluding sensitive information like password
export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  verificationDate?: Date;
  verifiedBy?: Types.ObjectId;
  departmentId?: Types.ObjectId | string;
  assignedServices?: Types.ObjectId[] | string[];
  verificationDocuments?: {
    documentType: string;
    documentNumber?: string;
    issuedBy?: string;
    issuedDate?: Date;
    expiryDate?: Date;
    verified: boolean;
    verifiedBy?: Types.ObjectId;
    verificationDate?: Date;
    documentUrl?: string;
  }[];
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
