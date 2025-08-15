import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  SYSTEM_ADMIN = 'system_admin',
  DEPT_ADMIN = 'dept_admin',
  DEPT_STAFF = 'dept_staff',
  CITIZEN = 'citizen',
}

export enum DocumentType {
  ID = 'id',
  ADDRESS_PROOF = 'address_proof',
  CERTIFICATE = 'certificate',
}

@Schema()
export class VerificationDocument {
  @Prop({ type: String, required: true, enum: Object.values(DocumentType) })
  documentType: DocumentType;

  @Prop({ type: String })
  documentNumber?: string;

  @Prop({ type: String })
  issuedBy?: string;

  @Prop({ type: Date })
  issuedDate?: Date;

  @Prop({ type: Date })
  expiryDate?: Date;

  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  verifiedBy?: Types.ObjectId;

  @Prop({ type: Date })
  verificationDate?: Date;

  @Prop({ type: String })
  documentUrl?: string;
}

@Schema()
export class NotificationPreferences {
  @Prop({ type: Boolean, default: true })
  email: boolean;

  @Prop({ type: Boolean, default: false })
  sms: boolean;
}

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.CITIZEN })
  role: UserRole;

  @Prop({ type: [VerificationDocument], default: [] })
  verificationDocuments?: VerificationDocument[];

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Date })
  verificationDate?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  verifiedBy?: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Department',
    required: function (this: User) {
      return this.role !== UserRole.CITIZEN;
    },
  })
  departmentId?: Types.ObjectId;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Service' }],
    default: [],
  })
  assignedServices?: Types.ObjectId[];

  @Prop({ type: NotificationPreferences, default: () => ({}) })
  notificationPreferences: NotificationPreferences;
}

export const UserSchema = SchemaFactory.createForClass(User);
