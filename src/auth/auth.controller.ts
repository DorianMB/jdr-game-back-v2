import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities/User';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() user: SignupDto): Promise<User> {
    return await this.authService.signup(user);
  }

  @Post('signin')
  async signin(@Body() user: SigninDto): Promise<string> {
    return await this.authService.signin(user);
  }
}
