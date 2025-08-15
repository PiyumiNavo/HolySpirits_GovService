import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DocumentType, UserRole } from '../schemas/user.schema';

export class VerificationDocumentResponseDto {
  @ApiProperty({
    description: 'Type of document',
    enum: DocumentType,
    example: DocumentType.ID,
  })
  documentType: DocumentType;

  @ApiProperty({
    description: 'Document number (if applicable)',
    example: 'ID12345678',
    required: false,
  })
  documentNumber?: string;

  @ApiProperty({
    description: 'Authority that issued the document',
    example: 'Department of Immigration',
    required: false,
  })
  issuedBy?: string;

  @ApiProperty({
    description: 'Date when the document was issued',
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  issuedDate?: Date;

  @ApiProperty({
    description: 'Date when the document expires',
    example: '2031-01-01T00:00:00.000Z',
    required: false,
  })
  expiryDate?: Date;

  @ApiProperty({
    description: 'Whether the document is verified',
    example: false,
    default: false,
  })
  verified: boolean;

  @ApiProperty({
    description: 'ID of user who verified this document',
    example: '6507f6b72a1f8b9a2c3d4e5f',
    required: false,
  })
  verifiedBy?: string;

  @ApiProperty({
    description: 'Date when the document was verified',
    example: '2023-09-18T12:34:56.789Z',
    required: false,
  })
  verificationDate?: Date;

  @ApiProperty({
    description: 'URL to access the document',
    example: 'https://example.com/documents/id12345.pdf',
    required: false,
  })
  documentUrl?: string;
}

export class NotificationPreferencesResponseDto {
  @ApiProperty({
    description: 'Whether to send notifications via email',
    example: true,
    default: true,
  })
  email: boolean;

  @ApiProperty({
    description: 'Whether to send notifications via SMS',
    example: false,
    default: false,
  })
  sms: boolean;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  _id: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.CITIZEN,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Verification documents',
    type: [VerificationDocumentResponseDto],
    required: false,
  })
  @Type(() => VerificationDocumentResponseDto)
  verificationDocuments?: VerificationDocumentResponseDto[];

  @ApiProperty({
    description: 'Whether the user is verified',
    example: false,
    default: false,
  })
  isVerified: boolean;

  @ApiProperty({
    description: 'Date when the user was verified',
    example: '2023-09-18T12:34:56.789Z',
    required: false,
  })
  verificationDate?: Date;

  @ApiProperty({
    description: 'ID of user who verified this user',
    example: '6507f6b72a1f8b9a2c3d4e5f',
    required: false,
  })
  verifiedBy?: string;

  @ApiProperty({
    description: 'Department ID (if applicable)',
    example: '6507f6b72a1f8b9a2c3d4e5f',
    required: false,
  })
  departmentId?: string;

  @ApiProperty({
    description: 'Services assigned to the user',
    type: [String],
    required: false,
    example: ['6507f6b72a1f8b9a2c3d4e5f', '6507f6b72a1f8b9a2c3d4e60'],
  })
  assignedServices?: string[];

  @ApiProperty({
    description: 'Notification preferences',
    type: NotificationPreferencesResponseDto,
  })
  notificationPreferences: NotificationPreferencesResponseDto;

  @ApiProperty({
    description: 'User creation timestamp',
    example: '2023-09-18T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User update timestamp',
    example: '2023-09-18T12:34:56.789Z',
  })
  updatedAt: Date;
}
