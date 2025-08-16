import { Types } from 'mongoose';
import { SubmissionStatus } from '../schemas/submission.schema';

/**
 * Interface for submission queries
 * Defines all possible fields that can be used in queries for submissions
 */
export interface SubmissionQuery {
  status?: SubmissionStatus;
  citizenId?: string | Types.ObjectId;
  serviceId?: string | Types.ObjectId | { $in: (string | Types.ObjectId)[] };
  createdAt?: any; // For date range queries
  assignedTo?: string | Types.ObjectId;
  'appointment.date'?: Date;
  'appointment.startTime'?: string;
  'appointment.endTime'?: string;
  'appointment.locationId'?: string | Types.ObjectId;
}
