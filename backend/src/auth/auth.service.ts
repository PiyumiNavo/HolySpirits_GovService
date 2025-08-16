import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { type UserDocument } from '../users/schemas/user.schema';
import { UserPayload } from './interfaces/user-payload.interface';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user; // Return the user document directly
  }

  login(user: UserDocument) {
    const payload: UserPayload = {
      email: user.email,
      name: user.name,
      sub: user._id,
      role: user.role,
      isVerified: user.isVerified,
      departmentId: user.departmentId,
    };

    return this.success(
      {
        access_token: this.jwtService.sign(payload),
        user,
      },
      'Login successful',
      HttpStatus.OK,
    );
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.success(
      user,
      'User registered successfully',
      HttpStatus.CREATED,
    );
  }

  refreshToken(user: UserDocument) {
    const payload: UserPayload = {
      email: user.email,
      name: user.name,
      sub: user._id,
      role: user.role,
      isVerified: user.isVerified,
      departmentId: user.departmentId,
    };

    return this.success(
      {
        access_token: this.jwtService.sign(payload),
      },
      'Token refreshed successfully',
      HttpStatus.OK,
    );
  }
}
