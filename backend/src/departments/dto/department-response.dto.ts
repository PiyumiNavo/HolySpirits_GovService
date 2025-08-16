import { ApiProperty } from '@nestjs/swagger';
import { DepartmentStatus, DepartmentType } from '../schemas/department.schema';

export class ContactInfoResponseDto {
  @ApiProperty({
    description: 'Official email addresses',
    example: ['info@department.gov', 'support@department.gov'],
    type: [String],
  })
  emails: string[];

  @ApiProperty({
    description: 'Official phone numbers',
    example: ['+94112345678', '+94112345679'],
    type: [String],
  })
  phones: string[];

  @ApiProperty({
    description: 'Official website URL',
    example: 'https://department.gov.lk',
    required: false,
  })
  website?: string;
}

export class DepartmentResponseDto {
  @ApiProperty({
    description: 'Department ID',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  _id: string;

  @ApiProperty({
    description: 'Official department name',
    example: 'Department of Immigration',
  })
  name: string;

  @ApiProperty({
    description: 'Official department code',
    example: 'DOI',
    required: false,
  })
  code?: string;

  @ApiProperty({
    description: 'Parent ministry if applicable',
    example: 'Ministry of Internal Affairs',
    required: false,
  })
  ministryName?: string;

  @ApiProperty({
    description: 'Department description',
    example: 'Handles immigration and emigration services',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Department address',
    example: '123 Main St, Colombo 01',
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'District where department is located',
    example: 'Colombo',
    required: false,
  })
  district?: string;

  @ApiProperty({
    description: 'Province where department is located',
    example: 'Western',
    required: false,
  })
  province?: string;

  @ApiProperty({
    description: 'Contact information',
    type: ContactInfoResponseDto,
  })
  contactInfo: ContactInfoResponseDto;

  @ApiProperty({
    description: 'Business Registration Number',
    example: 'BRN12345678',
    required: false,
  })
  registrationNumber?: string;

  @ApiProperty({
    description: 'Department type',
    enum: DepartmentType,
    example: DepartmentType.MINISTRY,
    required: false,
  })
  type?: DepartmentType;

  @ApiProperty({
    description: 'Department status',
    enum: DepartmentStatus,
    default: DepartmentStatus.ACTIVE,
  })
  status: DepartmentStatus;

  @ApiProperty({
    description: 'Department logo URL',
    example: 'https://cdn.gov.lk/logos/department.png',
    required: false,
  })
  logoUrl?: string;

  @ApiProperty({
    description: 'ID of user who created this department',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  createdBy: string;

  @ApiProperty({
    description: 'ID of main admin user for the department',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  mainAdminUserId: string;

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
