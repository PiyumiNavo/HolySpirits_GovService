import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type SubmissionDocument = Submission & Document;

export enum SubmissionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema()
export class Note {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: String })
  content: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

@Schema()
export class SubmissionFile {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  url: string;

  @Prop({ type: Date, default: Date.now })
  uploadedAt: Date;
}

@Schema()
export class Appointment {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: String })
  startTime: string;

  @Prop({ type: String })
  endTime: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Location' })
  locationId: Types.ObjectId;

  @Prop({ type: String })
  tokenNumber?: string;
}

@Schema({ timestamps: true })
export class Submission {
  _id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service', required: true })
  serviceId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  citizenId: Types.ObjectId;

  @Prop({ type: Map, of: MongooseSchema.Types.Mixed })
  formData: Map<string, any>;

  @Prop({
    type: String,
    enum: Object.values(SubmissionStatus),
    default: SubmissionStatus.PENDING,
  })
  status: SubmissionStatus;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  assignedTo?: Types.ObjectId;

  @Prop({ type: Appointment })
  appointment?: Appointment;

  @Prop({ type: [Note], default: [] })
  notes: Note[];

  @Prop({ type: [SubmissionFile], default: [] })
  documents: SubmissionFile[];
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);

// Create unique index for appointment conflict prevention
SubmissionSchema.index(
  {
    'appointment.date': 1,
    'appointment.startTime': 1,
    'appointment.endTime': 1,
    'appointment.locationId': 1,
  },
  {
    unique: true,
    partialFilterExpression: { 'appointment.date': { $exists: true } },
  },
);
