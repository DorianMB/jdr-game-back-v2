import { Module } from '@nestjs/common';
import { LootTablesService } from './loot-tables.service';
import { LootTablesController } from './loot-tables.controller';
import { ENTITIES, PROVIDERS } from '../utils/module.constants';

@Module({
  imports: [ENTITIES],
  controllers: [LootTablesController],
  providers: [...PROVIDERS],
  exports: [LootTablesService],
})
export class LootTablesModule {}
