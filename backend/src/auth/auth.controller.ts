import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/jwt/local-auth.guard';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { type RequestWithUser } from './interfaces/request-with-user.interface';
import { Public } from '../common/decorators/public.decorator';
import { type UserDocument } from 'src/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.authService.signup(createUserDto);

    return user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() _loginDto: LoginDto, @Req() req: RequestWithUser) {
    // LocalAuthGuard validates the credentials and adds the user to the request
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Req() req: RequestWithUser): UserDocument {
    return req.user as UserDocument;
  }

  // This endpoint is protected with JWT and returns the current user
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: RequestWithUser): UserDocument {
    return req.user as UserDocument;
  }

  // For session based auth, we would implement logout
  // With JWT auth, the client should just discard the token
  @UseGuards(JwtGuard)
  @Post('logout')
  logout() {
    return { message: 'Logout successful' };
  }
}
