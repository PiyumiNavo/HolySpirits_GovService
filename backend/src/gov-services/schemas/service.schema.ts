import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ServiceDocument = Service & Document;

export enum ServiceType {
  SINGLE_LOCATION = 'single-location',
  MULTI_LOCATION_PRESELECT = 'multi-location-preselect',
  MULTI_LOCATION_INFORM = 'multi-location-inform',
}

export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  TIME = 'time',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
  FILE = 'file',
}

@Schema()
export class FieldOption {
  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: String, required: true })
  value: string;
}

@Schema()
export class ValidationRule {
  @Prop({ type: Number })
  minLength?: number;

  @Prop({ type: Number })
  maxLength?: number;

  @Prop({ type: String })
  pattern?: string;

  @Prop({ type: Number })
  minValue?: number;

  @Prop({ type: Number })
  maxValue?: number;
}

@Schema()
export class FormField {
  @Prop({ type: String, required: true, enum: Object.values(FieldType) })
  fieldType: FieldType;

  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: String, required: true })
  key: string;

  @Prop({ type: Boolean, default: false })
  required: boolean;

  @Prop({ type: [FieldOption], default: [] })
  options?: FieldOption[];

  @Prop({ type: ValidationRule })
  validation?: ValidationRule;

  @Prop({ type: String })
  placeholder?: string;
}

@Schema()
export class TimeSlot {
  @Prop({
    type: String,
    enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  })
  day: string;

  @Prop({ type: String })
  startTime: string;

  @Prop({ type: String })
  endTime: string;

  @Prop({ type: Boolean, default: true })
  isAvailable: boolean;
}

@Schema()
export class AppointmentSettings {
  @Prop({ type: Boolean, default: false })
  isRequired: boolean;

  @Prop({ type: Number, default: 30 })
  duration: number; // Minutes

  @Prop({ type: Number, default: 1 })
  maxPerSlot: number;

  @Prop({ type: Number, default: 0 })
  bufferTime: number; // Minutes between appointments

  @Prop({ type: Number, default: 30 })
  advanceBookingDays: number;

  @Prop({ type: [Date], default: [] })
  blackoutDates: Date[];

  @Prop({ type: [TimeSlot], default: [] })
  timeSlots: TimeSlot[];
}

@Schema({ timestamps: true })
export class Service {
  _id: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Department',
    required: true,
  })
  departmentId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: String, required: true, enum: Object.values(ServiceType) })
  type: ServiceType;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Location' }] })
  locationIds: Types.ObjectId[];

  @Prop({ type: [FormField], default: [] })
  formFields: FormField[];

  @Prop({ type: AppointmentSettings, default: {} })
  appointmentSettings: AppointmentSettings;

  @Prop({ type: Boolean, default: false })
  autoAcceptAppointments: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isPublished: boolean;

  @Prop({ type: Number })
  processingTime?: number; // In days
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
