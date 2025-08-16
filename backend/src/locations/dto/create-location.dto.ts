import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsMongoId,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { WeekDay } from '../schemas/location.schema';

export class GeoCoordinatesDto {
  @ApiProperty({
    description: 'Latitude coordinate',
    example: 6.9271,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(-90)
  @Max(90)
  lat?: number;

  @ApiProperty({
    description: 'Longitude coordinate',
    example: 79.8612,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(-180)
  @Max(180)
  lng?: number;
}

export class WorkingHoursDto {
  @ApiProperty({
    description: 'Day of the week',
    enum: WeekDay,
    example: WeekDay.MON,
  })
  @IsEnum(WeekDay)
  day: WeekDay;

  @ApiProperty({
    description: 'Opening time in 24-hour format (HH:MM)',
    example: '09:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  openingTime?: string;

  @ApiProperty({
    description: 'Closing time in 24-hour format (HH:MM)',
    example: '17:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  closingTime?: string;

  @ApiProperty({
    description: 'Whether this day is closed',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isClosed?: boolean;
}

export class CreateLocationDto {
  @ApiProperty({
    description: 'Location name',
    example: 'Main Office',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Physical address',
    example: '123 Main St, Colombo 01',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'ID of the department this location belongs to',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  @IsMongoId()
  departmentId: string;

  @ApiProperty({
    description: 'Geographic coordinates',
    type: GeoCoordinatesDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => GeoCoordinatesDto)
  @IsOptional()
  geoCoordinates?: GeoCoordinatesDto;

  @ApiProperty({
    description: 'Working hours for each day of the week',
    type: [WorkingHoursDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkingHoursDto)
  @IsOptional()
  workingHours?: WorkingHoursDto[];

  @ApiProperty({
    description: 'Maximum capacity for appointments',
    example: 50,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  capacity?: number;
}
