import { Types } from 'mongoose';

export interface UserPayload {
  email: string;
  name?: string;
  sub: Types.ObjectId;
  role?: string;
  isVerified?: boolean;
  departmentId?: Types.ObjectId;
}
