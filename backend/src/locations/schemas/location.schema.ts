import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type LocationDocument = Location & Document;

export enum WeekDay {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}

@Schema()
export class GeoCoordinates {
  @Prop({ type: Number })
  lat?: number;

  @Prop({ type: Number })
  lng?: number;
}

@Schema()
export class WorkingHours {
  @Prop({ type: String, enum: Object.values(WeekDay) })
  day: WeekDay;

  @Prop({ type: String }) // Format: "HH:MM" (24-hour)
  openingTime?: string;

  @Prop({ type: String }) // Format: "HH:MM" (24-hour)
  closingTime?: string;

  @Prop({ type: Boolean, default: false })
  isClosed: boolean;
}

@Schema({ timestamps: true })
export class Location {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Department',
    required: true,
  })
  departmentId: Types.ObjectId;

  @Prop({ type: GeoCoordinates })
  geoCoordinates?: GeoCoordinates;

  @Prop({ type: [WorkingHours], default: [] })
  workingHours: WorkingHours[];

  @Prop({ type: Number })
  capacity?: number; // For appointment scheduling
}

export const LocationSchema = SchemaFactory.createForClass(Location);
