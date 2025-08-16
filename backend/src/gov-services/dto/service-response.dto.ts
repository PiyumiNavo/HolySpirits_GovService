import { ApiProperty } from '@nestjs/swagger';
import { FieldType, ServiceType } from '../schemas/service.schema';

export class FieldOptionResponseDto {
  @ApiProperty({
    description: 'Label for the option',
    example: 'Sri Lankan',
  })
  label: string;

  @ApiProperty({
    description: 'Value for the option',
    example: 'sri-lankan',
  })
  value: string;
}

export class ValidationRuleResponseDto {
  @ApiProperty({
    description: 'Minimum length for text fields',
    example: 5,
    required: false,
  })
  minLength?: number;

  @ApiProperty({
    description: 'Maximum length for text fields',
    example: 100,
    required: false,
  })
  maxLength?: number;

  @ApiProperty({
    description: 'Regular expression pattern for validation',
    example: '^[A-Za-z]+$',
    required: false,
  })
  pattern?: string;

  @ApiProperty({
    description: 'Minimum value for number fields',
    example: 0,
    required: false,
  })
  minValue?: number;

  @ApiProperty({
    description: 'Maximum value for number fields',
    example: 100,
    required: false,
  })
  maxValue?: number;
}

export class FormFieldResponseDto {
  @ApiProperty({
    description: 'Type of form field',
    enum: FieldType,
    example: FieldType.TEXT,
  })
  fieldType: FieldType;

  @ApiProperty({
    description: 'Label for the field',
    example: 'Full Name',
  })
  label: string;

  @ApiProperty({
    description: 'Unique identifier for the field',
    example: 'fullName',
  })
  key: string;

  @ApiProperty({
    description: 'Whether the field is required',
    example: true,
    default: false,
  })
  required: boolean;

  @ApiProperty({
    description: 'Options for select, radio, or checkbox fields',
    type: [FieldOptionResponseDto],
    required: false,
  })
  options?: FieldOptionResponseDto[];

  @ApiProperty({
    description: 'Validation rules for the field',
    type: ValidationRuleResponseDto,
    required: false,
  })
  validation?: ValidationRuleResponseDto;

  @ApiProperty({
    description: 'Placeholder text',
    example: 'Enter your full name',
    required: false,
  })
  placeholder?: string;
}

export class TimeSlotResponseDto {
  @ApiProperty({
    description: 'Day of the week',
    example: 'mon',
    enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  })
  day: string;

  @ApiProperty({
    description: 'Start time in HH:MM format (24-hour)',
    example: '09:00',
  })
  startTime: string;

  @ApiProperty({
    description: 'End time in HH:MM format (24-hour)',
    example: '17:00',
  })
  endTime: string;

  @ApiProperty({
    description: 'Whether this time slot is available for booking',
    example: true,
    default: true,
  })
  isAvailable: boolean;
}

export class AppointmentSettingsResponseDto {
  @ApiProperty({
    description: 'Whether an appointment is required for this service',
    example: true,
    default: false,
  })
  isRequired: boolean;

  @ApiProperty({
    description: 'Duration of each appointment in minutes',
    example: 30,
    default: 30,
  })
  duration: number;

  @ApiProperty({
    description: 'Maximum number of appointments per time slot',
    example: 1,
    default: 1,
  })
  maxPerSlot: number;

  @ApiProperty({
    description: 'Buffer time between appointments in minutes',
    example: 5,
    default: 0,
  })
  bufferTime: number;

  @ApiProperty({
    description: 'Number of days in advance that appointments can be booked',
    example: 30,
    default: 30,
  })
  advanceBookingDays: number;

  @ApiProperty({
    description: 'Dates when appointments are not available',
    type: [Date],
  })
  blackoutDates: Date[];

  @ApiProperty({
    description: 'Available time slots for appointments',
    type: [TimeSlotResponseDto],
  })
  timeSlots: TimeSlotResponseDto[];
}

export class ServiceResponseDto {
  @ApiProperty({
    description: 'Service ID',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  _id: string;

  @ApiProperty({
    description: 'ID of the department this service belongs to',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  departmentId: string;

  @ApiProperty({
    description: 'Name of the service',
    example: 'Passport Application',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the service',
    example: 'Apply for a new passport or renew an existing one',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Type of service location setup',
    enum: ServiceType,
    example: ServiceType.SINGLE_LOCATION,
  })
  type: ServiceType;

  @ApiProperty({
    description: 'IDs of locations where this service is available',
    type: [String],
  })
  locationIds: string[];

  @ApiProperty({
    description: 'Form fields for collecting information',
    type: [FormFieldResponseDto],
  })
  formFields: FormFieldResponseDto[];

  @ApiProperty({
    description: 'Settings for appointment booking',
    type: AppointmentSettingsResponseDto,
  })
  appointmentSettings: AppointmentSettingsResponseDto;

  @ApiProperty({
    description: 'Whether appointments are automatically accepted',
    example: false,
    default: false,
  })
  autoAcceptAppointments: boolean;

  @ApiProperty({
    description: 'ID of the user who created this service',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  createdBy: string;

  @ApiProperty({
    description: 'Whether the service is published and visible to citizens',
    example: false,
    default: false,
  })
  isPublished: boolean;

  @ApiProperty({
    description: 'Estimated processing time in days',
    example: 14,
    required: false,
  })
  processingTime?: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-09-18T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-09-19T15:45:00.000Z',
  })
  updatedAt: Date;
}
