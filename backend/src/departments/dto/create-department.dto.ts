import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DepartmentStatus, DepartmentType } from '../schemas/department.schema';

export class ContactInfoDto {
  @ApiProperty({
    description: 'Official email addresses',
    example: ['info@department.gov', 'support@department.gov'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  emails?: string[];

  @ApiProperty({
    description: 'Official phone numbers',
    example: ['+94112345678', '+94112345679'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  phones?: string[];

  @ApiProperty({
    description: 'Official website URL',
    example: 'https://department.gov.lk',
    required: false,
  })
  @IsString()
  @IsOptional()
  website?: string;
}

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'Official department name',
    example: 'Department of Immigration',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Official department code',
    example: 'DOI',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Parent ministry if applicable',
    example: 'Ministry of Internal Affairs',
    required: false,
  })
  @IsString()
  @IsOptional()
  ministryName?: string;

  @ApiProperty({
    description: 'Department description',
    example: 'Handles immigration and emigration services',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Department address',
    example: '123 Main St, Colombo 01',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'District where department is located',
    example: 'Colombo',
    required: false,
  })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({
    description: 'Province where department is located',
    example: 'Western',
    required: false,
  })
  @IsString()
  @IsOptional()
  province?: string;

  @ApiProperty({
    description: 'Contact information',
    type: ContactInfoDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => ContactInfoDto)
  @IsOptional()
  contactInfo?: ContactInfoDto;

  @ApiProperty({
    description: 'Business Registration Number',
    example: 'BRN12345678',
    required: false,
  })
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @ApiProperty({
    description: 'Department type',
    enum: DepartmentType,
    example: DepartmentType.MINISTRY,
    required: false,
  })
  @IsEnum(DepartmentType)
  @IsOptional()
  type?: DepartmentType;

  @ApiProperty({
    description: 'Department status',
    enum: DepartmentStatus,
    default: DepartmentStatus.ACTIVE,
    required: false,
  })
  @IsEnum(DepartmentStatus)
  @IsOptional()
  status?: DepartmentStatus;

  @ApiProperty({
    description: 'Department logo URL',
    example: 'https://cdn.gov.lk/logos/department.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({
    description: 'ID of main admin user for the department',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  @IsMongoId()
  mainAdminUserId: string;
}
