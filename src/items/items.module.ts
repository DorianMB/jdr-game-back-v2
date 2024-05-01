import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/Items';
import { LootTablesService } from '../loot-tables/loot-tables.service';
import { LootTable } from '../entities/LootTable';

@Module({
  imports: [TypeOrmModule.forFeature([Item, LootTable])],
  controllers: [ItemsController],
  providers: [ItemsService, LootTablesService],
})
export class ItemsModule {}
