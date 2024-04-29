import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/User';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllUsers(): Promise<object[]> {
    return await this.usersService.findAllUsers();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async findUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findById(+id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Body() user: Partial<User>): Promise<User> {
    return await this.usersService.updateUser(user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(+id);
  }
}
