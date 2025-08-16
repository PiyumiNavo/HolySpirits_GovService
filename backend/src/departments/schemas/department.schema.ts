import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type DepartmentDocument = Department & Document;

export enum DepartmentType {
  MINISTRY = 'Ministry',
  PROVINCIAL_COUNCIL = 'Provincial Council',
  LOCAL_AUTHORITY = 'Local Authority',
  OTHER = 'Other',
}

export enum DepartmentStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

@Schema()
export class ContactInfo {
  @Prop({ type: [String], default: [] })
  emails: string[];

  @Prop({ type: [String], default: [] })
  phones: string[];

  @Prop({ type: String })
  website?: string;
}

@Schema({ timestamps: true })
export class Department {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ unique: true })
  code?: string;

  @Prop()
  ministryName?: string;

  @Prop()
  description?: string;

  @Prop()
  address?: string;

  @Prop()
  district?: string;

  @Prop()
  province?: string;

  @Prop({ type: ContactInfo, default: {} })
  contactInfo: ContactInfo;

  @Prop()
  registrationNumber?: string;

  @Prop({ enum: DepartmentType })
  type?: DepartmentType;

  @Prop({ enum: DepartmentStatus, default: DepartmentStatus.ACTIVE })
  status: DepartmentStatus;

  @Prop()
  logoUrl?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  mainAdminUserId: Types.ObjectId;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
