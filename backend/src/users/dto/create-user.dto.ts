import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DocumentType, UserRole } from '../schemas/user.schema';
import { Types } from 'mongoose';

export class VerificationDocumentDto {
  @ApiProperty({
    description: 'Type of document',
    enum: DocumentType,
    example: DocumentType.ID,
  })
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @ApiProperty({
    description: 'Document number (if applicable)',
    example: 'ID12345678',
    required: false,
  })
  @IsString()
  @IsOptional()
  documentNumber?: string;

  @ApiProperty({
    description: 'Authority that issued the document',
    example: 'Department of Immigration',
    required: false,
  })
  @IsString()
  @IsOptional()
  issuedBy?: string;

  @ApiProperty({
    description: 'Date when the document was issued',
    example: '2021-01-01',
    required: false,
  })
  @IsOptional()
  issuedDate?: Date;

  @ApiProperty({
    description: 'Date when the document expires',
    example: '2031-01-01',
    required: false,
  })
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({
    description: 'URL to access the document',
    example: 'https://example.com/documents/id12345.pdf',
    required: false,
  })
  @IsString()
  @IsOptional()
  documentUrl?: string;
}

export class NotificationPreferencesDto {
  @ApiProperty({
    description: 'Whether to send notifications via email',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  email?: boolean;

  @ApiProperty({
    description: 'Whether to send notifications via SMS',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  sms?: boolean;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    default: UserRole.CITIZEN,
    required: false,
    example: UserRole.CITIZEN,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    description:
      'Department ID (required for department staff and admin roles)',
    required: false,
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  @IsOptional()
  @IsMongoId()
  departmentId?: string | Types.ObjectId;

  @ApiProperty({
    description: 'Verification documents (optional)',
    type: [VerificationDocumentDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VerificationDocumentDto)
  @IsOptional()
  verificationDocuments?: VerificationDocumentDto[];

  @ApiProperty({
    description: 'Notification preferences',
    type: NotificationPreferencesDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => NotificationPreferencesDto)
  @IsOptional()
  notificationPreferences?: NotificationPreferencesDto;
}
