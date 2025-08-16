import { ApiProperty } from '@nestjs/swagger';
import { WeekDay } from '../schemas/location.schema';

export class GeoCoordinatesResponseDto {
  @ApiProperty({
    description: 'Latitude coordinate',
    example: 6.9271,
    required: false,
  })
  lat?: number;

  @ApiProperty({
    description: 'Longitude coordinate',
    example: 79.8612,
    required: false,
  })
  lng?: number;
}

export class WorkingHoursResponseDto {
  @ApiProperty({
    description: 'Day of the week',
    enum: WeekDay,
    example: WeekDay.MON,
  })
  day: WeekDay;

  @ApiProperty({
    description: 'Opening time in 24-hour format (HH:MM)',
    example: '09:00',
    required: false,
  })
  openingTime?: string;

  @ApiProperty({
    description: 'Closing time in 24-hour format (HH:MM)',
    example: '17:00',
    required: false,
  })
  closingTime?: string;

  @ApiProperty({
    description: 'Whether this day is closed',
    example: false,
    default: false,
  })
  isClosed: boolean;
}

export class LocationResponseDto {
  @ApiProperty({
    description: 'Location ID',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  _id: string;

  @ApiProperty({
    description: 'Location name',
    example: 'Main Office',
  })
  name: string;

  @ApiProperty({
    description: 'Physical address',
    example: '123 Main St, Colombo 01',
  })
  address: string;

  @ApiProperty({
    description: 'ID of the department this location belongs to',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  departmentId: string;

  @ApiProperty({
    description: 'Geographic coordinates',
    type: GeoCoordinatesResponseDto,
    required: false,
  })
  geoCoordinates?: GeoCoordinatesResponseDto;

  @ApiProperty({
    description: 'Working hours for each day of the week',
    type: [WorkingHoursResponseDto],
  })
  workingHours: WorkingHoursResponseDto[];

  @ApiProperty({
    description: 'Maximum capacity for appointments',
    example: 50,
    required: false,
  })
  capacity?: number;

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
