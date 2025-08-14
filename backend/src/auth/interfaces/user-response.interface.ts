import { UserRole } from '../../users/schemas/user.schema';

// This represents the user data after excluding sensitive information like password
export interface UserResponse {
  _id: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
