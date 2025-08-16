import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsMongoId,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FieldType, ServiceType } from '../schemas/service.schema';

export class FieldOptionDto {
  @ApiProperty({
    description: 'Label for the option',
    example: 'Sri Lankan',
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: 'Value for the option',
    example: 'sri-lankan',
  })
  @IsString()
  value: string;
}

export class ValidationRuleDto {
  @ApiProperty({
    description: 'Minimum length for text fields',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minLength?: number;

  @ApiProperty({
    description: 'Maximum length for text fields',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxLength?: number;

  @ApiProperty({
    description: 'Regular expression pattern for validation',
    example: '^[A-Za-z]+$',
    required: false,
  })
  @IsOptional()
  @IsString()
  pattern?: string;

  @ApiProperty({
    description: 'Minimum value for number fields',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  minValue?: number;

  @ApiProperty({
    description: 'Maximum value for number fields',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  maxValue?: number;
}

export class FormFieldDto {
  @ApiProperty({
    description: 'Type of form field',
    enum: FieldType,
    example: FieldType.TEXT,
  })
  @IsEnum(FieldType)
  fieldType: FieldType;

  @ApiProperty({
    description: 'Label for the field',
    example: 'Full Name',
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: 'Unique identifier for the field',
    example: 'fullName',
  })
  @IsString()
  key: string;

  @ApiProperty({
    description: 'Whether the field is required',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @ApiProperty({
    description: 'Options for select, radio, or checkbox fields',
    type: [FieldOptionDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldOptionDto)
  options?: FieldOptionDto[];

  @ApiProperty({
    description: 'Validation rules for the field',
    type: ValidationRuleDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationRuleDto)
  validation?: ValidationRuleDto;

  @ApiProperty({
    description: 'Placeholder text',
    example: 'Enter your full name',
    required: false,
  })
  @IsOptional()
  @IsString()
  placeholder?: string;
}

export class TimeSlotDto {
  @ApiProperty({
    description: 'Day of the week',
    example: 'mon',
    enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  })
  @IsEnum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])
  day: string;

  @ApiProperty({
    description: 'Start time in HH:MM format (24-hour)',
    example: '09:00',
  })
  @IsString()
  startTime: string;

  @ApiProperty({
    description: 'End time in HH:MM format (24-hour)',
    example: '17:00',
  })
  @IsString()
  endTime: string;

  @ApiProperty({
    description: 'Whether this time slot is available for booking',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}

export class AppointmentSettingsDto {
  @ApiProperty({
    description: 'Whether an appointment is required for this service',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  @ApiProperty({
    description: 'Duration of each appointment in minutes',
    example: 30,
    default: 30,
  })
  @IsNumber()
  @Min(5)
  @IsOptional()
  duration?: number;

  @ApiProperty({
    description: 'Maximum number of appointments per time slot',
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  maxPerSlot?: number;

  @ApiProperty({
    description: 'Buffer time between appointments in minutes',
    example: 5,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  bufferTime?: number;

  @ApiProperty({
    description: 'Number of days in advance that appointments can be booked',
    example: 30,
    default: 30,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  advanceBookingDays?: number;

  @ApiProperty({
    description: 'Dates when appointments are not available',
    type: [Date],
    required: false,
  })
  @IsArray()
  @IsOptional()
  blackoutDates?: Date[];

  @ApiProperty({
    description: 'Available time slots for appointments',
    type: [TimeSlotDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlotDto)
  @IsOptional()
  timeSlots?: TimeSlotDto[];
}

export class CreateServiceDto {
  @ApiProperty({
    description: 'ID of the department this service belongs to',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  @IsMongoId()
  departmentId: string;

  @ApiProperty({
    description: 'Name of the service',
    example: 'Passport Application',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the service',
    example: 'Apply for a new passport or renew an existing one',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Type of service location setup',
    enum: ServiceType,
    example: ServiceType.SINGLE_LOCATION,
  })
  @IsEnum(ServiceType)
  type: ServiceType;

  @ApiProperty({
    description: 'IDs of locations where this service is available',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  locationIds?: string[];

  @ApiProperty({
    description: 'Form fields for collecting information',
    type: [FormFieldDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormFieldDto)
  @IsOptional()
  formFields?: FormFieldDto[];

  @ApiProperty({
    description: 'Settings for appointment booking',
    type: AppointmentSettingsDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => AppointmentSettingsDto)
  @IsOptional()
  appointmentSettings?: AppointmentSettingsDto;

  @ApiProperty({
    description: 'Whether appointments are automatically accepted',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  autoAcceptAppointments?: boolean;

  @ApiProperty({
    description: 'Whether the service is published and visible to citizens',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({
    description: 'Estimated processing time in days',
    example: 14,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  processingTime?: number;
}
