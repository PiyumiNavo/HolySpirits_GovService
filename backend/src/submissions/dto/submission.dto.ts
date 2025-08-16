import {
  IsString,
  IsEnum,
  IsOptional,
  IsMongoId,
  ValidateNested,
  IsDate,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SubmissionStatus } from '../schemas/submission.schema';

export class NoteDto {
  @ApiProperty({
    description: 'Content of the note',
    example:
      'Applicant was contacted and additional information was requested.',
  })
  @IsString()
  content: string;
}

export class AppointmentDto {
  @ApiProperty({
    description: 'Date of the appointment',
    example: '2023-09-30',
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Start time of the appointment in HH:MM format (24-hour)',
    example: '10:30',
  })
  @IsString()
  startTime: string;

  @ApiProperty({
    description: 'End time of the appointment in HH:MM format (24-hour)',
    example: '11:00',
  })
  @IsString()
  endTime: string;

  @ApiProperty({
    description: 'ID of the location for the appointment',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  @IsMongoId()
  locationId: string;

  @ApiProperty({
    description: 'Token number for the appointment (if applicable)',
    example: 'A123',
    required: false,
  })
  @IsString()
  @IsOptional()
  tokenNumber?: string;
}

export class CreateSubmissionDto {
  @ApiProperty({
    description: 'ID of the service being applied for',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  @IsMongoId()
  serviceId: string;

  @ApiProperty({
    description: 'Form data submitted by the citizen',
    example: { fullName: 'John Doe', age: 30, address: '123 Main St' },
  })
  @IsObject()
  formData: Record<string, any>;

  @ApiProperty({
    description: 'Appointment details (if required by the service)',
    type: AppointmentDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => AppointmentDto)
  @IsOptional()
  appointment?: AppointmentDto;
}

export class UpdateSubmissionStatusDto {
  @ApiProperty({
    description: 'Status of the submission',
    enum: SubmissionStatus,
    example: SubmissionStatus.APPROVED,
  })
  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;

  @ApiProperty({
    description: 'Note to add along with the status update',
    type: NoteDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => NoteDto)
  @IsOptional()
  note?: NoteDto;
}

export class AssignSubmissionDto {
  @ApiProperty({
    description: 'ID of the staff member to assign the submission to',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  @IsMongoId()
  assignedTo: string;

  @ApiProperty({
    description: 'Note to add along with the assignment',
    type: NoteDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => NoteDto)
  @IsOptional()
  note?: NoteDto;
}

export class AddNoteDto {
  @ApiProperty({
    description: 'Content of the note',
    example:
      'Applicant was contacted and additional information was requested.',
  })
  @IsString()
  content: string;
}

export class CancelSubmissionDto {
  @ApiProperty({
    description: 'Reason for cancellation',
    example: 'Requested by citizen due to scheduling conflict',
  })
  @IsString()
  reason: string;
}
