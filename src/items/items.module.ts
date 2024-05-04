import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ENTITIES, PROVIDERS } from '../utils/module.constants';

@Module({
  imports: [ENTITIES],
  controllers: [ItemsController],
  providers: [...PROVIDERS],
  exports: [ItemsService],
})
export class ItemsModule {}
