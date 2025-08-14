import { Types } from 'mongoose';

export interface UserPayload {
  email: string;
  sub: Types.ObjectId;
  role?: string;
}
