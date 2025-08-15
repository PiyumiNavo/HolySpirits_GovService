import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthResponseData {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    type: UserResponseDto,
  })
  user?: UserResponseDto;
}

// For Swagger documentation
export class AuthResponse {
  @ApiProperty({ description: 'HTTP status code', example: 200 })
  status: number;

  @ApiProperty({ description: 'Response message', example: 'Login successful' })
  message: string;

  @ApiProperty({
    description: 'Response data',
    type: AuthResponseData,
  })
  data: AuthResponseData;
}
