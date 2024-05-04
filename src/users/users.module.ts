import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ENTITIES, PROVIDERS } from '../utils/module.constants';

@Module({
  imports: [ENTITIES],
  providers: [...PROVIDERS],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
