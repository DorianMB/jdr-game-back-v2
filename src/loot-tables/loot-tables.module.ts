import { Module } from '@nestjs/common';
import { LootTablesService } from './loot-tables.service';
import { LootTablesController } from './loot-tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LootTable } from '../entities/LootTable';

@Module({
  imports: [TypeOrmModule.forFeature([LootTable])],
  controllers: [LootTablesController],
  providers: [LootTablesService],
  exports: [LootTablesService],
})
export class LootTablesModule {}
