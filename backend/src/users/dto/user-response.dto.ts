import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../schemas/user.schema';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '6507f6b72a1f8b9a2c3d4e5f',
  })
  _id: string;

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
    description: 'Department ID (if applicable)',
    example: '6507f6b72a1f8b9a2c3d4e5f',
    required: false,
  })
  departmentId?: string;

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
