import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  SYSTEM_ADMIN = 'system_admin',
  DEPT_ADMIN = 'dept_admin',
  DEPT_STAFF = 'dept_staff',
  CITIZEN = 'citizen',
}

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.CITIZEN })
  role: UserRole;

  @Prop({ type: String, default: null })
  departmentId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
