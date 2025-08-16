import { ApiProperty } from '@nestjs/swagger';
import { SubmissionStatus } from '../schemas/submission.schema';

export class NoteResponseDto {
  @ApiProperty({
    description: 'ID of the user who added the note',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  userId: string;

  @ApiProperty({
    description: 'Content of the note',
    example:
      'Applicant was contacted and additional information was requested.',
  })
  content: string;

  @ApiProperty({
    description: 'Date and time when the note was created',
    example: '2023-09-20T14:30:00.000Z',
  })
  createdAt: Date;
}

export class SubmissionFileResponseDto {
  @ApiProperty({
    description: 'Name of the document',
    example: 'id_card.pdf',
  })
  name: string;

  @ApiProperty({
    description: 'URL where the document can be accessed',
    example: 'https://storage.example.com/documents/id_card.pdf',
  })
  url: string;

  @ApiProperty({
    description: 'Date when the document was uploaded',
    example: '2023-09-20T14:30:00.000Z',
  })
  uploadedAt: Date;
}

export class AppointmentResponseDto {
  @ApiProperty({
    description: 'Date of the appointment',
    example: '2023-09-30T00:00:00.000Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Start time of the appointment in HH:MM format (24-hour)',
    example: '10:30',
  })
  startTime: string;

  @ApiProperty({
    description: 'End time of the appointment in HH:MM format (24-hour)',
    example: '11:00',
  })
  endTime: string;

  @ApiProperty({
    description: 'ID of the location for the appointment',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  locationId: string;

  @ApiProperty({
    description: 'Token number for the appointment (if applicable)',
    example: 'A123',
    required: false,
  })
  tokenNumber?: string;
}

export class SubmissionResponseDto {
  @ApiProperty({
    description: 'Submission ID',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  _id: string;

  @ApiProperty({
    description: 'ID of the service being applied for',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  serviceId: string;

  @ApiProperty({
    description: 'ID of the citizen who submitted the application',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  citizenId: string;

  @ApiProperty({
    description: 'Form data submitted by the citizen',
    example: { fullName: 'John Doe', age: 30, address: '123 Main St' },
  })
  formData: Record<string, any>;

  @ApiProperty({
    description: 'Status of the submission',
    enum: SubmissionStatus,
    example: SubmissionStatus.PENDING,
  })
  status: SubmissionStatus;

  @ApiProperty({
    description: 'ID of the staff member assigned to this submission',
    example: '6507f6b72a1f8b9a2c3d4e5f',
    required: false,
  })
  assignedTo?: string;

  @ApiProperty({
    description: 'Appointment details (if required by the service)',
    type: AppointmentResponseDto,
    required: false,
  })
  appointment?: AppointmentResponseDto;

  @ApiProperty({
    description: 'Notes added to the submission',
    type: [NoteResponseDto],
  })
  notes: NoteResponseDto[];

  @ApiProperty({
    description: 'Documents attached to the submission',
    type: [SubmissionFileResponseDto],
  })
  documents: SubmissionFileResponseDto[];

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
