import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for standard API responses - used for Swagger documentation
 * @export
 * @class ApiResponseDto
 * @template T - Type of data contained in the response
 */
export class ApiResponseDto<T> {
  @ApiProperty({ description: 'HTTP status code', example: 200 })
  status: number;

  @ApiProperty({ description: 'Response message', example: 'Success' })
  message: string;

  @ApiProperty({ description: 'Response data', nullable: true })
  data?: T;
}
