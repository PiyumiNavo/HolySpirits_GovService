import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * DTO for standard API responses with pagination information
 * Extends the standard ApiResponse to include pagination metadata
 * @export
 * @class PaginatedResponseDto
 * @template T - Type of data contained in the response
 */
export class PaginatedResponseDto<T> implements ApiResponse<T[]> {
  @ApiProperty({ description: 'HTTP status code', example: 200 })
  status: number;

  @ApiProperty({ description: 'Response message', example: 'Success' })
  message: string;

  @ApiProperty({ description: 'Response data' })
  data: T[];

  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Current page', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  totalPages: number;

  @ApiProperty({ description: 'Has next page', example: true })
  @IsOptional()
  hasNext?: boolean;

  @ApiProperty({ description: 'Has previous page', example: false })
  @IsOptional()
  hasPrevious?: boolean;
}
